using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebProject.Models
{
    // PlayerProfile myDeserializedClass = JsonConvert.DeserializeObject<PlayerProfile>(myJsonResponse); 
    public class PlayerProfile
    {
        public string avatar { get; set; }
        public int player_id { get; set; }

        [JsonProperty("@id")]
        public string Id { get; set; }
        public string url { get; set; }
        public string name { get; set; }
        public string username { get; set; }
        public int followers { get; set; }
        public string country { get; set; }
        public int last_online { get; set; }
        public int joined { get; set; }
        public string status { get; set; }
        public bool is_streamer { get; set; }
    }


}
