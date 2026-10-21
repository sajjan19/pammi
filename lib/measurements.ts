import type { MeasurementGroupId } from "@/lib/content";

/**
 * The rough sizes the order form can ask for.
 *
 * **Nothing here is a final measurement.** Pammi measures every customer
 * herself before cutting — self-taken numbers are not trusted to cut from,
 * because a tape held half an inch loose becomes a suit that doesn't fit.
 * These fields exist only so she can plan fabric and spot a job that needs
 * more of it, so every one of them is optional and none of them blocks an
 * order.
 *
 * Each garment in lib/content.ts lists the groups that apply to it, so a
 * customer ordering a kurti is never asked for a salwar length. Add a field
 * here and it appears automatically wherever its group is used.
 *
 * Every value is in inches. `hint` is the plain-English "roughly how?" line
 * shown under the field.
 */

export type MeasurementField = {
  /** Stored key. Changing this orphans the value on existing orders. */
  id: string;
  label: string;
  hint: string;
  /** Sanity bounds, in inches. Values outside this are rejected. */
  min: number;
  max: number;
};

export type MeasurementGroup = {
  id: MeasurementGroupId;
  title: string;
  description: string;
  fields: MeasurementField[];
};

export const measurementGroups: MeasurementGroup[] = [
  {
    id: "upper",
    title: "Body",
    description: "Roughly is fine.",
    fields: [
      {
        id: "bust",
        label: "Bust / chest",
        hint: "Around the fullest part.",
        min: 20,
        max: 70,
      },
      {
        id: "waist",
        label: "Waist",
        hint: "Around the narrowest part.",
        min: 18,
        max: 70,
      },
      {
        id: "hips",
        label: "Hips",
        hint: "Around the fullest part.",
        min: 20,
        max: 80,
      },
      {
        id: "shoulder",
        label: "Shoulder width",
        hint: "Across the back, tip to tip.",
        min: 8,
        max: 30,
      },
      {
        id: "armhole",
        label: "Armhole",
        hint: "Around the top of the arm.",
        min: 8,
        max: 30,
      },
    ],
  },
  {
    id: "sleeve",
    title: "Sleeves",
    description: "Arm relaxed.",
    fields: [
      {
        id: "sleeveLength",
        label: "Sleeve length",
        hint: "Shoulder to where the sleeve ends.",
        min: 2,
        max: 36,
      },
      {
        id: "sleeveRound",
        label: "Sleeve round at the hem",
        hint: "Around the arm where it ends.",
        min: 5,
        max: 30,
      },
    ],
  },
  {
    id: "kameez",
    title: "Kameez / kurta",
    description: "Measured from the shoulder.",
    fields: [
      {
        id: "kameezLength",
        label: "Kameez length",
        hint: "Shoulder to where the hem sits.",
        min: 15,
        max: 65,
      },
      {
        id: "frontNeckDepth",
        label: "Front neck depth",
        hint: "How low the front neckline goes.",
        min: 1,
        max: 20,
      },
      {
        id: "backNeckDepth",
        label: "Back neck depth",
        hint: "How low the back neckline goes.",
        min: 1,
        max: 20,
      },
      {
        id: "slitLength",
        label: "Side slit length",
        hint: "How high the side slits go.",
        min: 0,
        max: 30,
      },
    ],
  },
  {
    id: "bottom",
    title: "Salwar / pyjama",
    description: "Under the kameez.",
    fields: [
      {
        id: "bottomLength",
        label: "Bottom length",
        hint: "Waist to ankle.",
        min: 20,
        max: 55,
      },
      {
        id: "bottomWaist",
        label: "Waist for the bottoms",
        hint: "Where you tie them.",
        min: 18,
        max: 70,
      },
      {
        id: "thigh",
        label: "Thigh",
        hint: "Around the fullest part.",
        min: 12,
        max: 45,
      },
      {
        id: "bottomOpening",
        label: "Ankle opening",
        hint: "How wide at the ankle.",
        min: 6,
        max: 40,
      },
    ],
  },
];

export function getGroup(id: MeasurementGroupId): MeasurementGroup | undefined {
  return measurementGroups.find((g) => g.id === id);
}

export function groupsFor(ids: MeasurementGroupId[]): MeasurementGroup[] {
  return ids
    .map((id) => getGroup(id))
    .filter((g): g is MeasurementGroup => Boolean(g));
}

/** Every field across every group, keyed by id — used to label stored values. */
export const fieldsById: Record<string, MeasurementField> = Object.fromEntries(
  measurementGroups.flatMap((g) => g.fields.map((f) => [f.id, f])),
);

/**
 * How the real measurements will be taken.
 *
 * Every option ends with Pammi or a garment she can measure — none of them
 * is the customer's own tape measure.
 */
export const measurementSources = [
  {
    value: "in-person",
    label: "Pammi will measure me",
    hint: "The usual way.",
  },
  {
    value: "sample",
    label: "Copy a suit that fits me",
    hint: "Bring it when you drop off your fabric.",
  },
  {
    value: "onfile",
    label: "She has my measurements",
    hint: "For returning customers.",
  },
  {
    value: "not-needed",
    label: "Not needed for this job",
    hint: "For repairs.",
  },
];

export type MeasurementValues = Record<string, number>;

/**
 * Pulls the optional rough sizes out of submitted form data.
 *
 * Only fields belonging to the garment's own groups are read, so a customer
 * can't post a salwar length onto a kurti order. Blank fields are skipped,
 * and nothing here is ever required — a wildly wrong number is worth
 * catching, a missing one is not.
 *
 * The caller supplies the error wording, so it comes back in the customer's
 * own language.
 */
export function parseMeasurements(
  formData: FormData,
  groups: MeasurementGroup[],
  messages: {
    notNumber: string;
    outOfRange: (min: number, max: number) => string;
  },
): { values: MeasurementValues; errors: Record<string, string> } {
  const values: MeasurementValues = {};
  const errors: Record<string, string> = {};

  for (const group of groups) {
    for (const field of group.fields) {
      const raw = String(formData.get(`m_${field.id}`) ?? "").trim();
      if (!raw) continue;

      const value = Number(raw);
      if (!Number.isFinite(value)) {
        errors[field.id] = messages.notNumber;
      } else if (value < field.min || value > field.max) {
        errors[field.id] = messages.outOfRange(field.min, field.max);
      } else {
        values[field.id] = Math.round(value * 4) / 4; // nearest quarter inch
      }
    }
  }

  return { values, errors };
}
