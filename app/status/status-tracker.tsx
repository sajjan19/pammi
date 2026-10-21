import { Icon, type IconName } from "@/components/icon";
import styles from "./status-tracker.module.css";

/** The stages an order moves through, in order, each with its tool. */
const STAGES: { value: string; icon: IconName }[] = [
  { value: "new", icon: "order" },
  { value: "quoted", icon: "tag" },
  { value: "confirmed", icon: "spool" },
  { value: "stitching", icon: "machine" },
  { value: "ready", icon: "hanger" },
  { value: "collected", icon: "shopping" },
];

/**
 * A row of the order's stages: the ones done in gold, the current one in
 * pink, the ones still to come faded. Not shown for a cancelled order.
 */
export function StatusTracker({
  status,
  labels,
}: {
  status: string;
  labels: Record<string, string>;
}) {
  const current = STAGES.findIndex((stage) => stage.value === status);
  if (current === -1) return null;

  return (
    <ol className={styles.tracker}>
      {STAGES.map((stage, i) => {
        const state =
          i < current ? styles.done : i === current ? styles.current : styles.todo;
        return (
          <li
            key={stage.value}
            className={`${styles.stage} ${state}`}
            aria-current={i === current ? "step" : undefined}
          >
            <span className={styles.dot} aria-hidden="true">
              <Icon name={stage.icon} size={20} />
            </span>
            <span className={styles.label}>{labels[stage.value]}</span>
          </li>
        );
      })}
    </ol>
  );
}
