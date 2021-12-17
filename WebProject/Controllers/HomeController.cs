using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;
using WebProject.Models;
using System.Net.Http.Formatting;
using Newtonsoft.Json;

namespace WebProject.Controllers
{
    public class HomeController : Controller
    {
        private static string ISO = "GE";
        private static string URL = $"https://api.chess.com/pub/country/{ISO}/players";
        private static string urlParameters = $"?player=";


        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Get(string option, string args)
        {
            try
            {
                List<string> Args = JsonConvert.DeserializeObject<List<string>>(args);

                HttpClient client = new HttpClient();

                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(ChessApi.ApiList[option].DynamicInvoke(Args).ToString()).Result;
                if (response.IsSuccessStatusCode)
                {
                    var dataObjects = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    var myDeserializedClass = ChessApi.InfoDeserilizer[option].DynamicInvoke(dataObjects);
                    return Json(myDeserializedClass);   
                }
                else
                {
                    return Json(-1);
                }
            }
            catch
            {
                return Json(-1);
            }
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}
