using System;

namespace MyCustomSPTAKI;
public static class Constants {
    public static ModMetadata ModMetadata { get; } = new ModMetadata();

    public static String LoggerPrefix { get; } = String.Concat('[', ModMetadata.Name, '@', ModMetadata.Version, ']',' ');
}
