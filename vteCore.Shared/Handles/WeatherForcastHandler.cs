﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.DynamicLinq;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using vteCore.ErrorOr;
using vteCore.Shared;
using static vteCore.Shared.Constants;


namespace vteCore.Handles
{
    public class WeatherForcastHandler : IRequestHandler<UM.RqWeatherForcast, ErrorOr<IEnumerable<RM.WeatherForcast>>>
    {
        IResultGateway<ErrorOr<IEnumerable<RM.WeatherForcast>>> gateway;
        ILogger<WeatherForcastHandler> logger;

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public WeatherForcastHandler(IResultGateway<ErrorOr<IEnumerable<RM.WeatherForcast>>> gate, ILogger<WeatherForcastHandler> log) { 
            logger = log;
            gateway = gate;

        }

        public async Task<ErrorOr<IEnumerable<RM.WeatherForcast>>> Handle(UM.RqWeatherForcast request, CancellationToken cancellationToken)
        {
            var connectionid = request.ConnectionId;

            var mylist = Enumerable.Range(1, 5).Select(index => new RM.WeatherForcast
            {
                Id = index,
                RecordDate = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            }).ToList();
            //even await the observer call onnext has task function inside.  so no waiting at all.
            await gateway.OnDeliverResultAsync(new($"{connectionid}:{HubMethod.weather}", mylist));

            return mylist;
        }
    }
}
