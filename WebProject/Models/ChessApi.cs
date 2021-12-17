using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WebProject.Models
{
    public static class ChessApi
    {
        private static string _playerProfile = "https://api.chess.com/pub/player";
        private static string _countryPlayers = "https://api.chess.com/pub/country";
        private static string _availableArchieves = "https://api.chess.com/pub/player";
        private static string _monthlyArchieves = "https://api.chess.com/pub/player";

        /// <summary>
        ///  
        /// </summary>
        /// <param name="args">
        ///     args[0] = playerId
        /// </param>
        /// <returns></returns>
        public static string GetProfileUrl(List<string> args)
        {
            return $"{_playerProfile}/{args[0]}";
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="args">
        ///     args[0] = country iso
        /// </param>
        /// <returns></returns>
        public static string CountryPlayers(List<string> args)
        {
            return $"{_countryPlayers}/{args[0]}/players";
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="args">
        ///     args[0] = playerId
        /// </param>
        /// <returns></returns>
        public static string AvailableArchieves(List<string> args)
        {
            return $"{_availableArchieves}/{args[0]}/games/archives";
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="args">
        ///     args[0] = playerId
        ///     args[1] = year
        ///     arhs[2] = month
        /// </param>
        /// <returns></returns>
        public static string MonthlyArchieves(List<string> args)
        {
            return $"{_monthlyArchieves}/{args[0]}/games/{args[1]}/{args[2]}";
        }

        public static Dictionary<string, Delegate> ApiList = new Dictionary<string, Delegate>()
        {
            { "player.profile.data", new Func<List<string>, string>(GetProfileUrl) },
            { "player.country.players.data",  new Func<List<string>, string>(CountryPlayers) },
            { "player.available.archieves.data",  new Func<List<string>, string>(AvailableArchieves) },
            { "player.monthly.archieves.data",  new Func<List<string>, string>(MonthlyArchieves) }
        };

        public static Dictionary<string, Delegate> InfoDeserilizer = new Dictionary<string, Delegate>()
        {
            { "player.profile.data", new Func<string, PlayerProfile>(JsonConvert.DeserializeObject<PlayerProfile>)},
            { "player.monthly.archieves.data",  new Func<string, MonthlyArchieves>(JsonConvert.DeserializeObject<MonthlyArchieves>) }
        };
    }
}
