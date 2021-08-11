﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDAPI.Models
{
    public class Contexto : DbContext
    { 
        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes)
        {

        }

        public DbSet<Usuario> Usuarios { get; set; }
    }

    
}
