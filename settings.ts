import { App, PluginSettingTab, Setting } from "obsidian";
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

export class DimLightsSettingTab extends PluginSettingTab {
	plugin: DimLightsPlugin;

	constructor(app: App, plugin: DimLightsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
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
