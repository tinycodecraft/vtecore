using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace vteCore.dbBFA.Models
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<BFAContext>
    {
        IHostEnvironment _env;

        public DesignTimeDbContextFactory()
        {

        }

        public DesignTimeDbContextFactory(IHostEnvironment env)
        {
            _env = env;

        }
        public BFAContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(@Directory.GetCurrentDirectory() + "/../vteCore/appsettings.json")
                .Build();
            var builder = new DbContextOptionsBuilder<BFAContext>();
            var connectionString = configuration.GetConnectionString("dbBFA");
            builder.UseSqlServer(connectionString, opt => opt.MigrationsAssembly("vteCore.dbBFA"));
            return new BFAContext(builder.Options, _env);

        }
    }
}
