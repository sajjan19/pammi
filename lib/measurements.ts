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
    description: "Roughly, over a top that fits you reasonably well.",
    fields: [
      {
        id: "bust",
        label: "Bust / chest",
        hint: "Around the fullest part of the chest.",
        min: 20,
        max: 70,
      },
      {
        id: "waist",
        label: "Waist",
        hint: "Around the narrowest part, usually just above the belly button.",
        min: 18,
        max: 70,
      },
      {
        id: "hips",
        label: "Hips",
        hint: "Around the fullest part of the hips and seat.",
        min: 20,
        max: 80,
      },
      {
        id: "shoulder",
        label: "Shoulder width",
        hint: "Across the back, from the tip of one shoulder to the other.",
        min: 8,
        max: 30,
      },
      {
        id: "armhole",
        label: "Armhole",
        hint: "Around the top of the arm where a sleeve would be joined.",
        min: 8,
        max: 30,
      },
    ],
  },
  {
    id: "sleeve",
    title: "Sleeves",
    description: "With your arm relaxed at your side.",
    fields: [
      {
        id: "sleeveLength",
        label: "Sleeve length",
        hint: "From the shoulder tip down to where you'd like the sleeve to end.",
        min: 2,
        max: 36,
      },
      {
        id: "sleeveRound",
        label: "Sleeve round at the hem",
        hint: "Around your arm at the point the sleeve will end.",
        min: 5,
        max: 30,
      },
    ],
  },
  {
    id: "kameez",
    title: "Kameez / kurti",
    description: "The top itself — lengths run from the shoulder down.",
    fields: [
      {
        id: "kameezLength",
        label: "Kameez length",
        hint: "From the shoulder seam down to about where you'd like the hem.",
        min: 15,
        max: 65,
      },
      {
        id: "frontNeckDepth",
        label: "Front neck depth",
        hint: "From the base of the neck down to where the neckline should sit.",
        min: 1,
        max: 20,
      },
      {
        id: "backNeckDepth",
        label: "Back neck depth",
        hint: "The same measurement down the back.",
        min: 1,
        max: 20,
      },
      {
        id: "slitLength",
        label: "Side slit length",
        hint: "How far up from the hem the side slits should open.",
        min: 0,
        max: 30,
      },
    ],
  },
  {
    id: "bottom",
    title: "Salwar / bottoms",
    description: "Whatever you're wearing under the kameez.",
    fields: [
      {
        id: "bottomLength",
        label: "Bottom length",
        hint: "From your waist down to the ankle, along the outside of the leg.",
        min: 20,
        max: 55,
      },
      {
        id: "bottomWaist",
        label: "Waist for the bottoms",
        hint: "Where you actually tie or wear them — often lower than your natural waist.",
        min: 18,
        max: 70,
      },
      {
        id: "thigh",
        label: "Thigh",
        hint: "Around the fullest part of one thigh.",
        min: 12,
        max: 45,
      },
      {
        id: "bottomOpening",
        label: "Ankle opening",
        hint: "How wide you'd like the leg opening at the ankle.",
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
    hint: "The usual way. She takes them properly when you drop your fabric off.",
  },
  {
    value: "sample",
    label: "Copy a suit that already fits me",
    hint: "Bring a suit you like the fit of and it gets measured and copied.",
  },
  {
    value: "onfile",
    label: "She already has my measurements",
    hint: "For returning customers. Mention anything that's changed in the notes.",
  },
  {
    value: "not-needed",
    label: "Not needed for this job",
    hint: "Used for repairs and hemming.",
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
 */
export function parseMeasurements(
  formData: FormData,
  groups: MeasurementGroup[],
): { values: MeasurementValues; errors: Record<string, string> } {
  const values: MeasurementValues = {};
  const errors: Record<string, string> = {};

  for (const group of groups) {
    for (const field of group.fields) {
      const raw = String(formData.get(`m_${field.id}`) ?? "").trim();
      if (!raw) continue;

      const value = Number(raw);
      if (!Number.isFinite(value)) {
        errors[field.id] = "Please enter a number in inches, or leave it blank.";
      } else if (value < field.min || value > field.max) {
        errors[field.id] = `That should be between ${field.min} and ${field.max} inches — or leave it blank and she'll measure.`;
      } else {
        values[field.id] = Math.round(value * 4) / 4; // nearest quarter inch
      }
    }
  }

  return { values, errors };
}
