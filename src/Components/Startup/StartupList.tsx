import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import {ReactElement, useEffect, useState} from "react";
import {StartupHttpService} from "../../Http/Startup/Startup.http.service";
import {Startup} from "../../Types/Startup";

export default function StartupList(): ReactElement {
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    StartupHttpService.getStartups().then((startups) => {
      return setStartups(startups);
    });
  }, []);
  return <Grid id="startup-list" container direction="row" spacing={2}>
      {startups.map((startup) => {
          return (
              <Grid
                  item
                  xs={12}
                  key={startup.id}
                  data-cy={"startupId-" + startup.id}
              >
                  <Card>
                    <CardHeader
                        title={startup.name}
                        subheader={`Founded: ${startup.dateFounded.getFullYear()}
                    ${
                            startup.employees
                                ? " | " + startup.employees + " Employees"
                                : ""
                        }  
                    ${
                            startup.totalFunding?
                                 " | " + startup.totalFunding + " Mio. $" : " | Funding Undisclosed"
                        } 
                     ${
                            startup.currentInvestmentStage
                                ? " | " + startup.currentInvestmentStage
                                : ""
                        }`}
                    />
                    <CardContent sx={{ pt: 0 }}>
                      {startup.shortDescription}
                    </CardContent>
                  </Card>
              </Grid>
          );
        })}
</Grid>
}
