va# Temperature API Assignment

## Installation

1. Clone this repository
2. Ensure system dependencies are installed ( nodejs | npm | sqlite3 )
3. Install dependencies

```
npm install
```

4. In the newly cloned repository run the following command:

```
sqlite3 weather.db
```

5. Create the table needed:

```
CREATE TABLE temperature (city text, temperature text, time number);
```

6. Press CTRL-D to exit the sqlite3 prompt
7. Run the application:

```
node ./index.js
```

8. You can get the temperature for Portland, Oregon like this:

```
curl http://localhost:8080/temperature
```

9. For other cities, it is the City,State (if USA) or City,Country. Examples:
USA:

```
curl http://localhost:8080/temperature/Miami,Florida
```

Rest of world:

```
curl http://localhost:8080/temperature/London,UK
curl http://localhost:8080/temperature/Brussels,Belgium
```
