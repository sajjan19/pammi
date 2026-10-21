/**
 * Hands every page its content in the visitor's language.
 *
 * lib/content.ts holds the English and everything that isn't words (prices,
 * days, pictures). lib/content-pa.ts holds only Punjabi words. This file
 * lays one over the other, so a price is only ever set in one place and a
 * missing translation falls back to the English instead of breaking.
 *
 * Safe on both server and client — nothing here reads cookies.
 */

import {
  about,
  business,
  examples,
  faqs,
  fabricSources,
  gallery,
  garments,
  getStatus,
  isPlaceholder,
  necklines,
  occasions,
  policies,
  sleeveStyles,
  steps,
  type Garment,
  type GalleryItem,
} from "@/lib/content";
import {
  aboutPa,
  businessPa,
  examplesPa,
  fabricSourcesPa,
  faqsPa,
  galleryPa,
  garmentsPa,
  measurementFieldsPa,
  measurementGroupsPa,
  measurementSourcesPa,
  optionLabelsPa,
  policiesPa,
  statusLabelsPa,
  stepsPa,
} from "@/lib/content-pa";
import {
  measurementGroups,
  measurementSources,
  type MeasurementGroup,
} from "@/lib/measurements";
import type { Lang } from "@/lib/i18n";
import type { MeasurementGroupId } from "@/lib/content";

export type Option = { value: string; label: string };

function localizeGarment(garment: Garment, lang: Lang): Garment {
  if (lang === "en") return garment;
  const pa = garmentsPa[garment.slug];
  return pa ? { ...garment, ...pa } : garment;
}

function localizeGroup(group: MeasurementGroup, lang: Lang): MeasurementGroup {
  if (lang === "en") return group;
  return {
    ...group,
    ...measurementGroupsPa[group.id],
    fields: group.fields.map((field) => ({
      ...field,
      ...measurementFieldsPa[field.id],
    })),
  };
}

/** A dropdown's options: the English value is kept, only the label changes. */
function options(values: string[], lang: Lang): Option[] {
  return values.map((value) => ({
    value,
    label: lang === "pa" ? (optionLabelsPa[value] ?? value) : value,
  }));
}

export function getContent(lang: Lang) {
  const pa = lang === "pa";

  return {
    business: pa ? { ...business, ...businessPa } : business,

    about: {
      quote: pa ? aboutPa.quote : about.quote,
      facts: about.facts.map((fact) =>
        pa ? { ...fact, ...aboutPa.facts[fact.id] } : fact,
      ),
      photo: about.photo,
      photoAlt: pa ? aboutPa.photoAlt : about.photoAlt,
    },

    garments: garments.map((g) => localizeGarment(g, lang)),

    // Punjabi steps and policies hold only words; laying them over the
    // English by position keeps each one's drawing.
    steps: steps.map((step, i) => (pa ? { ...step, ...stepsPa[i] } : step)),

    // A policy still marked TODO isn't something to show a customer — this
    // is how the unfinished payment line stays off the Services page.
    policies: policies
      .map((policy, i) => (pa ? { ...policy, ...policiesPa[i] } : policy))
      .filter((policy) => !isPlaceholder(policy.body)),

    gallery: gallery.map(
      (item): GalleryItem => (pa ? { ...item, ...galleryPa[item.src] } : item),
    ),

    faqs: pa ? faqsPa : faqs,

    examples: examples.map((ex) => (pa ? { ...ex, ...examplesPa[ex.id] } : ex)),

    fabricSources: fabricSources.map((source) =>
      pa ? { ...source, ...fabricSourcesPa[source.value] } : source,
    ),

    necklines: options(necklines, lang),
    sleeveStyles: options(sleeveStyles, lang),
    occasions: options(occasions, lang),

    measurementGroups: measurementGroups.map((g) => localizeGroup(g, lang)),

    measurementSources: measurementSources.map((source) =>
      pa ? { ...source, ...measurementSourcesPa[source.value] } : source,
    ),
  };
}

export type Content = ReturnType<typeof getContent>;

/** The garment for a slug, in the given language. */
export function getLocalizedGarment(slug: string, lang: Lang): Garment | undefined {
  return getContent(lang).garments.find((g) => g.slug === slug);
}

/** The measurement groups a garment uses, in the given language. */
export function localizedGroupsFor(
  ids: MeasurementGroupId[],
  lang: Lang,
): MeasurementGroup[] {
  const all = getContent(lang).measurementGroups;
  return ids
    .map((id) => all.find((g) => g.id === id))
    .filter((g): g is MeasurementGroup => Boolean(g));
}

/** What a customer sees for an order's status, in their language. */
export function customerStatusLabel(status: string, lang: Lang): string {
  const fallback = getStatus(status).customerLabel;
  return lang === "pa" ? (statusLabelsPa[status] ?? fallback) : fallback;
}
