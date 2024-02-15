using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace vteCore.dbBFA.Models;

public partial class DFAUser: IUser
{
    [NotMapped]
    public string Email { get
        {

            return $"{this.UserName}@unknown.com";
        } 
    }
}
public partial class BFAContext
{
    IHostEnvironment _env;
    public BFAContext(DbContextOptions<BFAContext> options, IHostEnvironment env)
        : base(options)
    {
        _env = env;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {


        base.OnConfiguring(optionsBuilder);
        IConfigurationRoot configuration = null;

        if (!_env.IsProduction())
        {
            configuration = new ConfigurationBuilder()
                                .SetBasePath(Directory.GetCurrentDirectory())
                                .AddJsonFile(@Directory.GetCurrentDirectory() + "/../vteCore/appsettings.json")
                                .Build();
        }
        else
        {
            configuration = new ConfigurationBuilder()
                                .SetBasePath(Directory.GetCurrentDirectory())
                                .AddJsonFile(@Directory.GetCurrentDirectory() + "/appsettings.json", optional: false, reloadOnChange: true)
                                .AddJsonFile(@Directory.GetCurrentDirectory() + $"/appsettings.{_env.EnvironmentName}.json", optional: true)
                                .Build();
        }

        var builder = new DbContextOptionsBuilder<BFAContext>();
        var connectionString = configuration.GetConnectionString("dbBFA");
        optionsBuilder.UseSqlServer(connectionString);

    }
}