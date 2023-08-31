     //create an array of every server
     var servers = ns.scan("home");

     // iterate over the list repeatedly, checking that it grows each time so we know we aren't
     // wasting resources, while dynamically removing duplicates.
     var hasGrowth = true;
     while (hasGrowth) {
          const oldLen = servers.length;          // remember what the length was before we started scanning

          var temp = []
          for (const serv of servers) {
               temp = temp.concat(ns.scan(serv));        // add everyhing we scan from the servers in 'servers' to temp
          }

          for (const serv of temp) {
               if (servers.indexOf(serv) == -1) {   // if the array 'servers' doesn't already have the server we found
                    servers.push(serv);             // add it
               }
          }

          // check that the list got longer, setting flag to false if it didn't
          if (servers.length > oldLen) {
               hasGrowth = true;
          }
          else {
               hasGrowth = false;
          }
     }

     // remove the player owned servers
     var owned = ns.getPurchasedServers();
     for (var i = 0; i < owned.length; ++i) {
          if (servers.indexOf(owned[i]) > -1) {
               const index = servers.indexOf(owned[i]);
               servers.splice(index, 1);
          }
     }

  return servers;
