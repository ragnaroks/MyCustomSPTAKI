using SPTarkov.Server.Core.Models.Common;
using System;
using System.Globalization;
using System.Numerics;

namespace MyCustomSPTAKI.Helper;
public static class Miscellaneous {
    public static MongoId MongoIdCalc (MongoId id,Int32 value) {
        if(value is 0){return id;}
        if(BigInteger.TryParse(id.ToString(),NumberStyles.HexNumber,null,out BigInteger bigValue) is false){return id;}
        _ = false;
        return new MongoId((bigValue + value).ToString("X2"));
    }
}
