# Local build environment recovery — October 2

## Authorized storage migration

After repeated runtime installation failures and the user's instruction to decide and finish, performed a recoverable, manually scoped migration rather than the separate threshold-triggered automatic cache-deletion workflow. No Trash was emptied, no application or project source was moved, and no Codex database or task archive status was changed.

### Old task history

- Selected only database-known regular JSONL history files from older month directories or archived history, at least 1 MiB, with neither filesystem nor database updates in the preceding 24 hours.
- Excluded the current task, open files reported by `lsof`, symbolic links, hard-linked files, and files already redirected through a parent path. Rechecked activity and metadata immediately before switching each path.
- Copied each selected file to the external active location and verified SHA-256; preserved the original path as a symbolic link and moved the original to a second external recovery copy. Verified both recovery content and reading through the original link against the same hash.
- Final readback: **133 records, 5,272,375,537 bytes**; every entry is `verified-migrated`, every original-path link resolves, both copies have the expected sizes, and no local intermediate original remains.
- Recovery directory: `/Volumes/LaCie/StyleAtlas-analytics-20261001/Codex-history-recovery-20261002/`. Its private `manifest.json` records exact original paths, hashes, links and backup locations. LaCie must remain mounted to read these migrated histories. Restore by copying the verified recovery file back to its original path in place of its symlink while that task is inactive; do not replace active history files.

### Inactive generated build output

Only exact old `yixiu-prototype/dist` directories were selected, after verifying they were ignored, not tracked by Git, had no repository files opened by a process, and had no index lock. Source trees, dependencies, native build archives and live deployment directories were excluded. Each directory is moved recoverably, with full file/link manifest hashing and unchanged repository HEAD/status fingerprints required before accepting it.

Recovery directory: `/Volumes/LaCie/StyleAtlas-analytics-20261001/Inactive-build-cache-recovery-20261002/`. Its private manifest records targets and verification. These generated outputs can be restored from that directory or regenerated using each project's build command; no application source modification is part of this operation.

Final readback: **10 generated-output directories, 2,496,768 KiB**. All destination content hashes matched, all original cache paths were absent after the move, and every affected repository retained its prior HEAD and porcelain-status fingerprint. No dependency directory or native archive was selected. Data-volume availability was approximately 17 GiB at the beginning of the turn and 26 GiB after both migrations; those observed filesystem totals include unrelated APFS fluctuations and are not a claim that all of the difference was caused by this task.

## Packaging boundary

This continuation authorizes local build validation only. App Store upload/review state, subscription prices, version/build number, production H5 and the operations dashboard are unchanged. A successful migration is not evidence of a successful runtime installation or archive; those outcomes are recorded separately below when verified.

## Completed-history follow-up

The first migration plus generated-cache moves did not resolve the external-source runtime import: it failed with code 14 after staging another image. A second, explicit six-file whitelist was checked individually: each task's last turn was completed, its status was not loaded, no process held the history open, and both database and filesystem activity were at least six hours old (observed 6.45–15.1 hours). These were exceptions to the initial 24-hour selection rule, not active tasks or a blanket migration of recent history.

All **six records, 2,644,850,465 bytes**, completed the same SHA-256 copy, original-path symlink, second recovery copy, and activity-recheck procedure. Their private manifest is under `/Volumes/LaCie/StyleAtlas-analytics-20261001/Codex-completed-history-recovery-20261002/`. Task archive status and databases were not modified. Reading these histories also requires LaCie to remain connected.

## Runtime restored

Reused the already-staged official image with `xcrun simctl runtime add` instead of repeating the external staging copy. The command completed successfully, and independent `xcrun simctl runtime list -j` readback reported:

- iOS 26.5, build `23F77`, runtime `com.apple.CoreSimulator.SimRuntime.iOS-26-5`.
- Identifier `4E0FA557-BF46-4979-A418-F233E856EA58`, state **Ready**, signature **Verified**.
- Installed image `/Library/Developer/CoreSimulator/Images/4E0FA557-BF46-4979-A418-F233E856EA58.dmg`, size 8,494,282,293 bytes.
- Xcode's destination listing recognized the generic iOS destination and the connected phone. No phone installation was performed.

Evidence: `/tmp/style-atlas-runtime-internal-reuse-20261002.log` and `/tmp/style-atlas-destinations-20261002.log`. The earlier failed external retry is recorded separately in `/tmp/style-atlas-runtime-after-migration-20261002.log`; observed free-space values are not a guaranteed minimum for installation.

## Archive and export verified

Release archive completed with **ARCHIVE SUCCEEDED**, followed by App Store-distribution local export with **EXPORT SUCCEEDED**. The existing export options specify export, not upload. The initial external-dependency archive attempt was interrupted during slow HDD Git status work; the successful attempt reused already-resolved local SourcePackages, with DerivedData, temporary build files, archive and export on LaCie.

- Archive: `/Volumes/LaCie/StyleAtlas-analytics-20261001/StyleAtlas-analytics-validation.xcarchive`.
- IPA: `/Volumes/LaCie/StyleAtlas-analytics-20261001/StyleAtlas-analytics-export/StyleAtlas.ipa`.
- IPA SHA-256: `6532006eaf0c429a686f4ed72c65f12f239455e31e37f8adf95c27b823f55336`.
- Archive log: `/tmp/style-atlas-analytics-archive-localpackages-20261002.log`.
- Export log: `/tmp/style-atlas-analytics-export-20261002.log`.

Both the archived app and independently extracted exported IPA passed strict deep code-signature verification and artifact checks:

- Bundle `com.xiazishuo.styleatlas`, unchanged version **1.6 (19)**, iPhone and iPad device families.
- Exported app signed by `Apple Distribution: YONG YUAN (L855ZVM679)`.
- Analytics collection, IDFV collection, automatic screen reporting and ad-personalization defaults all remain false.
- Official Firebase configuration and privacy manifest match source exactly; no Firebase plist was added to the widget.
- All **170 bundled Web files** match source SHA-256 hashes, as does `DailyStyles.json`.

This proves local packaging and configuration, not interactive native QA or production analytics receipt. No App Store upload, submission change, build-number increment, device installation, or production deployment occurred. Build 19 is not a fresh release number; a later authorized release must use an appropriate new build number.

## Remaining non-blocking staging cleanup

Attempted to move the obsolete, unregistered staging image `0FC52435-3043-411C-9570-04943684EA00.dmg` from `/Library/Developer/CoreSimulator/Cryptex/Images/Inbox/` into the task's external backup directory using Finder. After the normal administrator continuation, Finder stayed at zero bytes / estimating time. Requested normal cancellation with Command-period; Finder displayed “正在停止…”, and its system log confirmed the file-coordinator instances were cancelled. Completion of the UI cancellation is not yet confirmed. No force termination, permission change, or deletion was used.

Final readback at this checkpoint: the original staging image remains intact at 8,494,282,293 bytes; the external destination is only a zero-byte placeholder and **must not be treated as a backup**. This unfinished housekeeping does not invalidate the exported IPA. The separate installed image `4E0FA557-BF46-4979-A418-F233E856EA58.dmg` remains **Ready / Verified**. Data-volume available space was 15,590,412 KiB (about 14.87 GiB), subject to normal filesystem fluctuation. No claim of reclaiming the staged image's size is made.
