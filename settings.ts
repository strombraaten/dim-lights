import { App, PluginSettingTab, Setting } from "obsidian";
import type { SettingDefinitionItem } from "obsidian";
import type DimLightsPlugin from "./main";

export interface DimLightsSettings {
	enabled: boolean;
	/** 0 = pitch black, 100 = full brightness (no dimming). */
	lightLevel: number;
}

export const DEFAULT_SETTINGS: DimLightsSettings = {
	enabled: true,
	lightLevel: 15,
};

type SettingKey = keyof DimLightsSettings;

export class DimLightsSettingTab extends PluginSettingTab {
	plugin: DimLightsPlugin;

	constructor(app: App, plugin: DimLightsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	/**
	 * Declarative settings (Obsidian 1.13.0+) so this plugin's settings show up in
	 * Obsidian's built-in settings search. On older Obsidian versions this method
	 * doesn't exist on the base class, so `display()` below is used instead as a
	 * fallback — kept in sync with the definitions here.
	 */
	getSettingDefinitions(): SettingDefinitionItem[] {
		return [
			{
				name: "Enable dimming",
				desc: "Dim every pane except the one you're focused on whenever more than one is open.",
				control: { type: "toggle", key: "enabled" satisfies SettingKey },
			},
			{
				name: "Light level",
				desc: "Turn the lights down on inactive panes — 0 is pitch black, 100 is full brightness.",
				control: { type: "slider", key: "lightLevel" satisfies SettingKey, min: 0, max: 100, step: 5 },
			},
		];
	}

	async setControlValue(key: string, value: unknown): Promise<void> {
		await super.setControlValue(key, value);

		if (key === "lightLevel") {
			this.plugin.applyLightLevelVariable();
		}
		this.plugin.refreshDimming();
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Enable dimming")
			.setDesc("Dim every pane except the one you're focused on whenever more than one is open.")
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.enabled).onChange(async (value) => {
					this.plugin.settings.enabled = value;
					await this.plugin.saveSettings();
					this.plugin.refreshDimming();
				})
			);

		new Setting(containerEl)
			.setName("Light level")
			.setDesc("Turn the lights down on inactive panes — 0 is pitch black, 100 is full brightness.")
			.addSlider((slider) =>
				slider
					.setLimits(0, 100, 5)
					.setValue(this.plugin.settings.lightLevel)
					.onChange(async (value) => {
						this.plugin.settings.lightLevel = value;
						await this.plugin.saveSettings();
						this.plugin.applyLightLevelVariable();
					})
			);
	}
}
