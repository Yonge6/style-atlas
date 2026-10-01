# Style Atlas Firebase activation

## Scope and corrected permission finding

User requested completing this setup through the path that succeeded for Yixiu, after the earlier report incorrectly treated the current default login's permission as an unavoidable blocker.

The Yixiu completion evidence in `yixiu-firebase-activation-20260930/docs/growth/2026-09-30-firebase-activation.md` and live Firebase console show an already-signed-in project administrator. Default login `hustyy986@gmail.com` still cannot see the project, but the existing `wondereilan@gmail.com` session can. No account role was changed, no new login/credentials were requested, and no billing upgrade was made.

## Official connection

- Existing Firebase project: `yixiu-meditation`, free Spark plan.
- Registered only **Style Atlas iOS**, bundle `com.xiazishuo.styleatlas`, App Store ID `6787447019`.
- Firebase App ID: `1:319625849765:ios:5c0aa2d3e6fc5cbb28564c`.
- Existing GA4 property: `549913650`, WonderElian Web Portfolio.
- Independent GA4 iOS stream: `15932140049`; console stream details matched both bundle and Firebase App ID. Yixiu `15887405392`, Buer `15912522443` and Web `15440113521` remained unchanged.
- The console download event did not reach the browser wrapper. Its normal `GetIosAppConfig` response returned HTTP 200 with the official base64 plist; decoded values were used unchanged. No auth token was extracted. The client config is not an administrative credential.
- Main App resources include the matching config and privacy manifest. Widget target does not receive Firebase config. Default collection, IDFV and automatic screen reporting remain disabled; consent/production StoreKit gates are unchanged.
- Private ops mapping now selects the exact Style Atlas stream. The Data API returned successfully for 2026-09-03 through 2026-09-30, with no new events yet. This proves the reporting connection, not production App usage.
- Ops deployed with public SHA-256 readback and nginx checks; backup `/srv/wonderelian/backups/atlas-usage-20261001-ops-r2`. Browser iOS tab now states that its independent reporting connection is verified and actual data requires a production App release plus consent.

## Privacy and verification

Native manifest declares five analytics-only categories (App instance/device identifier, coarse region, interactions, purchase events, fixed diagnostic categories), linked conservatively via the instance ID, without advertising tracking. UserDefaults reason `CA92.1` covers app-local preferences. No raw notes, searches, transaction identifiers, location permissions or IDFA/IDFV.

The public privacy page clarifies these same fields. References checked live: [Firebase SDK disclosure](https://firebase.google.com/docs/ios/app-store-data-collection), [Analytics disclosure](https://support.google.com/analytics/answer/10285841), [Apple required-reason APIs](https://developer.apple.com/documentation/bundleresources/describing-use-of-required-reason-api).

- Added tests first failed for missing config/manifest, then passed: four native-config/transport unit tests, including exact App ID, resource target isolation and disabled default flags.
- Ops: 112 tests and state validation passed.
- Xcode project and plist lint passed. Previously the Swift module compiled, but no complete new native build or App Store distribution is claimed.

## Build environment (pending)

Attempted to import Yixiu's retained matching 23F77 platform from `/Volumes/LaCie/Yixiu-analytics-review-20260930/platform-download/iphonesimulator_26.5_23F77.exportedBundle`. The official importer failed: `Cannot copy the image because the disk is almost full`. No runtime is registered after failure.

Moved only this task's Style Atlas build caches, preserving them on LaCie:

- `/tmp/StyleAtlas-Usage-20261001` → `/Volumes/LaCie/StyleAtlas-analytics-20261001/DerivedData`
- `/Users/yongyuan/Library/Developer/Xcode/DerivedData/StyleAtlas-gtwwselehtnjzgewqrlakkpncgyv` → `/Volumes/LaCie/StyleAtlas-analytics-20261001/PreviousDefaultDerivedData`

At this initial checkpoint the system disk had approximately 5 GiB available, below the roughly 8 GiB runtime alone. Requested approval before moving shared iOS DeviceSupport caches; unrelated caches, source and personal assets are untouched. Existing App Store review, App version and subscription prices are unchanged. Full build, device consent QA, App Store privacy publication and a new native release remain separate uncompleted release steps.

## Authorized cache migration and packaging continuation

User confirmed migration of the shared rebuildable iOS DeviceSupport cache to LaCie. On October 1, the 5.6 GiB source was copied and a checksum-based `rsync --dry-run --checksum` comparison returned no differences. The original directory was then moved to an additional external recovery copy (not discarded), and the original Xcode path now symlinks to the verified external copy:

- Original path: `/Users/yongyuan/Library/Developer/Xcode/iOS DeviceSupport`
- Active target: `/Volumes/LaCie/StyleAtlas-analytics-20261001/iOS DeviceSupport`
- Original recovery copy: `/Volumes/LaCie/StyleAtlas-analytics-20261001/iOS DeviceSupport-original-backup`

Both `iPhone15,3 26.4.2 (23E261)` and `iPhone15,3 26.5.2 (23F84)` remain available. System free space increased from about 5.4 GiB to 11 GiB. No source, personal media or other project cache was removed. LaCie must remain mounted when these device-support symbols are needed. Recovery is possible from either retained copy.

Pre-build verification: 356 browser tests passed (1 optional external SDK wire test skipped), four analytics/native configuration unit tests passed, and iOS catalog/SEO/expansion/resource checks passed. Main App and widget App Store provisioning profiles are present and valid through September 5, 2027.

### October 2 runtime import blocker

The official `xcodebuild -importPlatform` and `simctl runtime add` paths still failed with CoreSimulator error 14, `Cannot copy the image because the disk is almost full`. `xcodebuild` continued staging in the internal user temporary directory despite an external `TMPDIR`. The documented `--move` option on the internally staged image also failed. No runtime was registered.

Two complete temporary bundles created by these attempts were moved, without discarding the originals retained on LaCie, to this task's external directory:

- `RecoveredRuntimeStaging.exportedBundle`
- `RecoveredRuntimeStaging-20261002.exportedBundle`

A subsequent `simctl runtime add --move` from the second external copy again staged internally. It was interrupted with SIGINT when available internal space reached about 2.9 GiB. Its task-created partial `/private/tmp/094-56039-099.dmg` was moved to `InterruptedRuntimeStaging-20261002.partial.dmg`; this is an incomplete diagnostic artifact, not an installable runtime. Source absence and destination presence were verified, and internal available space returned to about 11 GiB. The cross-volume move reported that the destination could not preserve the original `wheel` group; this partial artifact is owned by the current user and is not used for installation. Yixiu's original export remains untouched.

Read-only inspection identified a remaining root-owned 8,494,282,293-byte image in `/Library/Developer/CoreSimulator/Cryptex/Images/Inbox/703B0112-A06A-4710-927E-BD44C586612E.dmg`. The service created this Inbox entry during a failed attempt; it remains unregistered. `simctl runtime list` and `simctl list runtimes` are empty, and `simctl runtime delete all --dry-run` reports no matching images. No administrator credentials are available to this process. This protected staging artifact was not removed or modified, nor was the system service restarted.

Packaging remains blocked on the Xcode runtime/storage environment. No archive, IPA, device installation, App Store upload, review change, price change, or claim of native production telemetry was made in this continuation. Further shared/system cleanup requires a separately scoped administrator action; do not expand cleanup to unrelated project data.

### Authorized administrator attempt (October 2)

The user authorized handling only the identified protected Inbox artifact. No credential was placed in commands, files or this report. An administrator-privileged macOS operation attempted to move that exact image to `RecoveredSystemInbox-703B0112.dmg` on LaCie, but returned `Operation not permitted`. A same-volume move to a newly created, task-specific temporary directory also returned `Operation not permitted`; the chained ownership change did not execute. Readback confirmed the original file still exists with its original size/ownership, and neither attempted destination contains the image. No permission protection was disabled.

Xcode Settings → Components was inspected: iOS 26.5.1 + iOS 26.5 Simulator is offered via **Get**, and Other Installed Platforms says **No Items**. Thus the normal component UI has no installed runtime entry to remove, matching the empty `simctl` inventory. The settings window was closed after inspection. The exact reason for the system denial has not been established; additional administrator authorization alone did not resolve it. Available internal disk space at final readback was approximately 9.9 GiB. Packaging remains uncompleted, with no further import or release attempted.

### Finder recovery and bounded retry (October 2)

The user's first Finder operation copied the old `703B0112...dmg` to the root of LaCie, but left the internal source intact. Following the user's request to take over, used Finder's **Move Item Here** action (Command-Option-V), accepted its normal administrator continuation, and observed the complete move to `/Volumes/LaCie/StyleAtlas-analytics-20261001/703B0112-A06A-4710-927E-BD44C586612E.dmg`. Readback confirmed the internal source no longer exists, the destination is exactly 8,494,282,293 bytes, and available internal space increased from about 8.7 GiB to 18 GiB. The user's initial external copy remains untouched.

One bounded official `simctl runtime add` retry from the retained task export again failed with error 14 after staging, leaving about 9.8 GiB available. Log: `/tmp/style-atlas-runtime-after-finder-20261002.log`. The new unregistered Inbox artifact is `9A2F9A5B-7FAB-4D39-A282-A21F466BB3CA.dmg`. This demonstrates that approximately 18 GiB before staging was insufficient for this installation attempt; no exact minimum-space claim is made.

Read-only checks found no substantial remaining Style Atlas build artifacts internally (iOS source 32 MiB, node_modules 17 MiB, build 27 MiB). Remaining default DerivedData belongs to another App project and was not touched. Four analytics/configuration unit tests and all three relevant plist/project lint checks passed again. No archive, export, upload or review change was performed.

Recovered the retry's new `9A2F9A5B...dmg` via the same normal Finder move to the task directory on LaCie. Verified its full 8,494,282,293-byte destination, absence of the internal source, an empty CoreSimulator Cryptex Images directory, and approximately 19 GiB available internally at final readback. No runtime is installed and no installation process remains active. Both recovered images and the original Yixiu export remain available for recovery; the retry did not leave its temporary disk allocation internally.

A metadata-only storage check found about 10 GiB of September Codex session history. Migrating it is outside the prior cache/artifact scope, so separate user authorization was requested before any change, with active/writing records to be excluded and original-path links/recovery retained. No Codex history, other project worktree, application or personal file was moved.
