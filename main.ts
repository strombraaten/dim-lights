import { Plugin } from "obsidian";
import { clearDimming, recomputeDimming } from "./dimmer";
import { DEFAULT_SETTINGS, DimLightsSettings, DimLightsSettingTab } from "./settings";

export default class DimLightsPlugin extends Plugin {
	settings: DimLightsSettings;

	async onload(): Promise<void> {
		await this.loadSettings();
		this.applyLightLevelVariable();

		this.addSettingTab(new DimLightsSettingTab(this.app, this));

		this.addCommand({
			id: "toggle-dimming",
			name: "Toggle dimming",
			callback: async () => {
				this.settings.enabled = !this.settings.enabled;
				await this.saveSettings();
				this.refreshDimming();
			},
		});

		this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.refreshDimming()));
		this.registerEvent(this.app.workspace.on("layout-change", () => this.refreshDimming()));

		this.app.workspace.onLayoutReady(() => this.refreshDimming());
	}

	onunload(): void {
		clearDimming(this.app);
	}

	refreshDimming(): void {
		recomputeDimming(this.app, this.settings.enabled);
	}

	applyLightLevelVariable(): void {
		this.app.workspace.containerEl.style.setProperty(
			"--dim-lights-light-level",
			String(this.settings.lightLevel / 100)
		);
	}

	async loadSettings(): Promise<void> {
		const data = (await this.loadData()) as Partial<DimLightsSettings> | null;
		this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}
