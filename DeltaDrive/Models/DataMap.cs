using CsvHelper.Configuration;

namespace DeltaDrive.Models
{
    public class DataMap : ClassMap<Vehicle>
    {
        public DataMap()
        {
            Map(m => m.brand);
            Map(m => m.firstName);
            Map(m => m.lastName);
            Map(m => m.latitude);
            Map(m => m.longitude);
            Map(m => m.startPrice);
            Map(m => m.pricePerKM);
        }
    }
}
