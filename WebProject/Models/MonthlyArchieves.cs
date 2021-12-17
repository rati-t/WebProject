using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProject.Models
{
    // MonthlyArchieves myDeserializedClass = JsonConvert.DeserializeObject<MonthlyArchieves>(myJsonResponse); 
    public class Accuracies
    {
        public double white { get; set; }
        public double black { get; set; }
    }

    public class White
    {
        public int rating { get; set; }
        public string result { get; set; }

        [JsonProperty("@id")]
        public string Id { get; set; }
        public string username { get; set; }
        public string uuid { get; set; }
    }

    public class Black
    {
        public int rating { get; set; }
        public string result { get; set; }

        [JsonProperty("@id")]
        public string Id { get; set; }
        public string username { get; set; }
        public string uuid { get; set; }
    }

    public class Game
    {
        public string url { get; set; }
        public string pgn { get; set; }
        public string time_control { get; set; }
        public int end_time { get; set; }
        public bool rated { get; set; }
        public Accuracies accuracies { get; set; }
        public string tcn { get; set; }
        public string uuid { get; set; }
        public string initial_setup { get; set; }
        public string fen { get; set; }
        public string time_class { get; set; }
        public string rules { get; set; }
        public White white { get; set; }
        public Black black { get; set; }
    }

    public class MonthlyArchieves
    {
        public List<Game> games { get; set; }
    }


}
