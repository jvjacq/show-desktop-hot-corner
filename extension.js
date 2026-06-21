import St from 'gi://St';
import Meta from 'gi://Meta';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class ShowDesktopHotCorner extends Extension {
    enable() {
        this._settings = this.getSettings();
        this._hiddenWindows = null;

        this._corner = new St.Button({
            reactive: true,
            track_hover: true,
            width: 1,
            height: 1,
        });

        Main.layoutManager.addChrome(this._corner);

        this._corner.connectObject(
            'enter-event', () => this._trigger(),
            this
        );

        Main.layoutManager.connectObject(
            'monitors-changed', () => this._updatePosition(),
            this
        );

        this._settings.connectObject(
            'changed::corner', () => this._updatePosition(),
            this
        );

        this._updatePosition();
    }

    _trigger() {
        if (this._hiddenWindows !== null) {
            for (const [w, id] of this._hiddenWindows)
                w.disconnect(id);
            this._hiddenWindows.forEach(([w]) => w.unminimize());
            this._hiddenWindows = null;
            return;
        }

        const workspace = global.workspace_manager.get_active_workspace();
        const visible = workspace.list_windows().filter(w =>
            !w.minimized && w.get_window_type() === Meta.WindowType.NORMAL
        );

        if (visible.length === 0) return;

        this._hiddenWindows = visible.map(w => [
            w,
            w.connect('unmanaged', () => {
                if (this._hiddenWindows)
                    this._hiddenWindows = this._hiddenWindows.filter(([win]) => win !== w);
            }),
        ]);
        visible.forEach(w => w.minimize());
    }

    _updatePosition() {
        const monitor = Main.layoutManager.primaryMonitor;
        if (!monitor) return;

        const corner = this._settings.get_string('corner');
        const left = corner.includes('left');
        const top = corner.includes('top');

        const x = left ? monitor.x : monitor.x + monitor.width - 1;
        const y = top ? monitor.y : monitor.y + monitor.height - 1;

        this._corner.set_position(x, y);
    }

    disable() {
        this._settings?.disconnectObject(this);
        Main.layoutManager.disconnectObject(this);

        if (this._corner) {
            this._corner.disconnectObject(this);
            Main.layoutManager.removeChrome(this._corner);
            this._corner.destroy();
            this._corner = null;
        }

        if (this._hiddenWindows !== null) {
            for (const [w, id] of this._hiddenWindows)
                w.disconnect(id);
            this._hiddenWindows.forEach(([w]) => w.unminimize());
            this._hiddenWindows = null;
        }

        this._settings = null;
    }
}
