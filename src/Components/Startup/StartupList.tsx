import {Card, CardContent, CardHeader, Grid, Pagination} from "@mui/material";
import React, {ReactElement, useEffect, useState} from "react";
import {StartupHttpService} from "../../Http/Startup/Startup.http.service";
import {Startup} from "../../Types/Startup";
import usePagination from "../Pagination";

export default function StartupList(): ReactElement {
  const [startups, setStartups] = useState<Startup[]>([]);

  let [page, setPage] = useState<number>(1);
  const PER_PAGE = 10;

  const count = Math.ceil(startups.length / PER_PAGE);
  const _Startups = usePagination(startups, PER_PAGE);

  const handleChange = (event: React.ChangeEvent<unknown>,
    p: number) => {
    event.preventDefault()
    setPage(p);
    _Startups.jump(p);
  };

  useEffect(() => {
      StartupHttpService.getStartups().then((startups) => {
      setStartups(startups);
    });
  }, []);

  return <Grid id="startup-list" container direction="row" spacing={2}>
      {_Startups.currentData().map((startup) => {
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
        <Grid 
          container spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Pagination 
            count={count} 
            size="large" 
            onChange={handleChange} 
            page={page}    
            color="primary"
            shape="circular"
          />
        </Grid>
</Grid>
}
