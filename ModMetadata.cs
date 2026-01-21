using SPTarkov.Server.Core.Models.Spt.Mod;
using System;
using System.Collections.Generic;

namespace MyCustomSPTAKI;

public record ModMetadata : AbstractModMetadata {
    public override String ModGuid { get; init; } = "net.skydust.mycustomsptaki";
    public override String Name { get; init; } = "MyCustomSPTAKI";
    public override String Author { get; init; } = "ragnaroks";
    public override List<String>? Contributors { get; init; } = null;
    public override SemanticVersioning.Version Version { get; init; } = new("4.0.20260103");
    public override SemanticVersioning.Range SptVersion { get; init; } = new("~4.0.0");
    public override List<String>? Incompatibilities { get; init; } = null;
    public override Dictionary<String, SemanticVersioning.Range>? ModDependencies { get; init; } = null;
    public override String? Url { get; init; } = "https://github.com/ragnaroks/MyCustomSPTAKI";
    public override Boolean? IsBundleMod { get; init; } = false;
    public override String License { get; init; } = "AGPLv3";
}
