import { App, WorkspaceLeaf } from "obsidian";

export const DIM_CLASS = "dim-lights-dimmed";

/**
 * A leaf is "visible" if it sits in the main editor area (not a sidebar)
 * and its content element is actually rendered on screen — this naturally
 * excludes background tabs in a tab group without needing to walk the
 * workspace split/tabs tree by hand.
 */
function getMainAreaLeaves(app: App): WorkspaceLeaf[] {
	const root = app.workspace.rootSplit;
	const leaves: WorkspaceLeaf[] = [];

	app.workspace.iterateAllLeaves((leaf) => {
		if (leaf.getRoot() === root) {
			leaves.push(leaf);
		}
	});

	return leaves;
}

function getVisibleMainAreaLeaves(app: App): WorkspaceLeaf[] {
	return getMainAreaLeaves(app).filter((leaf) => leaf.view.containerEl.isShown());
}

/**
 * Recomputes which panes should be dimmed. Called on every active-leaf-change,
 * layout-change, and once on layout-ready. Cheap enough to run unconditionally —
 * no diffing against previous state needed.
 */
export function recomputeDimming(app: App, enabled: boolean): void {
	const visibleLeaves = getVisibleMainAreaLeaves(app);

	if (!enabled || visibleLeaves.length <= 1) {
		for (const leaf of visibleLeaves) {
			leaf.view.containerEl.removeClass(DIM_CLASS);
		}
		return;
	}

	const activeLeaf = app.workspace.getMostRecentLeaf(app.workspace.rootSplit);

	for (const leaf of visibleLeaves) {
		if (leaf === activeLeaf) {
			leaf.view.containerEl.removeClass(DIM_CLASS);
		} else {
			leaf.view.containerEl.addClass(DIM_CLASS);
		}
	}
}

/** Strips dimming from every leaf in the main area, including background tabs — used on unload/disable. */
export function clearDimming(app: App): void {
	for (const leaf of getMainAreaLeaves(app)) {
		leaf.view.containerEl.removeClass(DIM_CLASS);
	}
}
