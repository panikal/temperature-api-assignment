# Temperature API Assignment

## Automatic Installation

1. Clone this repository
2. Ensure system dependencies are installed ( vagrant | sqlite3 )
3. Start vagrant

## Manual Installation



1. Install dependencies ( sqlite3 | nodejs | npm )

2. Install node modules

```
npm install
```

3. Run the application:

```
npm start
```

## Usage

1. You can get the temperature for Portland, Oregon like this:

```
curl http://localhost:8080/temperature
```

2. For other cities, it is the City,State (if USA) or City,Country. Examples:
USA:

```
curl http://localhost:8080/temperature/Miami,Florida
```

Rest of world:

```
curl http://localhost:8080/temperature/London,UK
curl http://localhost:8080/temperature/Brussels,Belgium
```

### To test:

```
npm test
```

## Notes
 
- You may need to run ```vagrant plugin install vagrant-vbguest``` and then run ```vagrant reload``` if you see a message about vboxsf not supported or have problems running puppet

## Future improvements

- Better testing, use an actual test framework (seems overkill to use a large framework for a single API end point with a single function)
- Conversion between C/K/F using a query param where scale = [faranheit|celsius|kelvin]