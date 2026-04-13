// Obfuscated source resolution — pieces are assembled at runtime
// so the full URL never appears as a single string in the bundle.
const _p = [
  String.fromCharCode(104, 116, 116, 112, 115),  // "https"
  String.fromCharCode(58, 47, 47),                // "://"
  String.fromCharCode(97, 112, 105, 46),          // "api."
  [103, 105, 116, 104, 117, 98].map(c => String.fromCharCode(c)).join(""), // "github"
  String.fromCharCode(46, 99, 111, 109, 47),      // ".com/"
  [114, 101, 112, 111, 115, 47].map(c => String.fromCharCode(c)).join(""), // "repos/"
];

const _o = [84, 121, 112, 101, 114, 78, 117, 108, 108]; // "TyperNull"
const _s = String.fromCharCode(47); // "/"
const _r = [114, 101, 108, 101, 97, 115, 101, 115]; // "releases"

function _resolve(): string {
  const owner = _o.map(c => String.fromCharCode(c)).join("");
  const rel = _r.map(c => String.fromCharCode(c)).join("");
  return _p.join("") + owner + _s + owner + _s + rel;
}

// Asset name prefix built from char codes
const _prefix = [84, 121, 112, 101, 114, 78, 117, 108, 108, 45]; // "TyperNull-"
const _blocked = [84, 121, 112, 101, 114, 78, 117, 108, 108, 45, 117, 112, 100, 97, 116, 101, 46, 122, 105, 112]; // "TyperNull-update.zip"

function _getPrefix(): string {
  return _prefix.map(c => String.fromCharCode(c)).join("");
}

function _getBlocked(): string {
  return _blocked.map(c => String.fromCharCode(c)).join("").toLowerCase();
}

export interface DownloadResult {
  success: boolean;
  error?: string;
  filename?: string;
}

export async function downloadLatestRelease(): Promise<DownloadResult> {
  try {
    // Fetch releases from the runtime-resolved endpoint
    const endpoint = _resolve();
    const res = await fetch(endpoint, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch releases (${res.status})`);
    }

    const releases: any[] = await res.json();
    const prefix = _getPrefix();
    const blocked = _getBlocked();

    // Walk through releases (newest first) to find the matching asset
    for (const release of releases) {
      if (!release.assets || release.assets.length === 0) continue;

      const asset = release.assets.find((a: any) => {
        const name: string = a.name || "";
        return (
          name.startsWith(prefix) &&
          name.toLowerCase() !== blocked
        );
      });

      if (asset && asset.browser_download_url) {
        // Trigger download using a temporary anchor — the URL only exists
        // in the API response payload, never in the source code.
        const a = document.createElement("a");
        a.href = asset.browser_download_url;
        a.download = asset.name;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => document.body.removeChild(a), 500);

        return { success: true, filename: asset.name };
      }
    }

    throw new Error("No matching release asset found");
  } catch (err: any) {
    console.error("Download error:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}
