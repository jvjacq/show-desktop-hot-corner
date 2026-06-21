# Show Desktop Hot Corner

A GNOME Shell extension that minimises all windows when your mouse hits a configurable screen corner. Trigger again to restore them.

## Features

- Minimise all normal windows on the active workspace by moving your mouse to any corner
- Trigger the corner again to restore the minimised windows
- Configurable corner position via Extension Manager preferences (top-left, top-right, bottom-left, bottom-right)
- Defaults to bottom-right

## Installation

### From extensions.gnome.org (recommended)

Search for "Show Desktop Hot Corner" in [Extension Manager](https://flathub.org/apps/com.mattjakeman.ExtensionManager) or visit the extension page on [extensions.gnome.org](https://extensions.gnome.org).

### Manual

```bash
git clone https://github.com/jvjacq/show-desktop-hot-corner ~/.local/share/gnome-shell/extensions/show-desktop-hot-corner@jvjacq.com
glib-compile-schemas ~/.local/share/gnome-shell/extensions/show-desktop-hot-corner@jvjacq.com/schemas/
gnome-extensions enable show-desktop-hot-corner@jvjacq.com
```

## Supported GNOME versions

45, 46, 47, 48, 49, 50

## License

GPL-2.0
