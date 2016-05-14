function event_date_unit(unit) {
    switch (unit) {
        case "hour":
            return function(e) { 
                var d = new Date(e.time);
                d.setMinutes(0);
                d.setSeconds(0);
                d.setMilliseconds(0);
                return d.toISOString();
            };
        case "day":
            return function(e) { 
                var d = new Date(e.time);
                return d.toISOString().split("T")[0];
            };
        case "week":
            return function(e) {
                var d = new Date(e.time);
                var day = d.getDate(),
                    month = d.getMonth(),
                    year = d.getFullYear(),
                    weekday = d.getDay() || 7;

                return (new Date(year, month, day - (weekday - 1))).toISOString().split("T")[0];
            };
        case "month":
            return function(e) {
                var d = new Date(e.time);
                d.setDate(1);
                d.setHours(0);
                d.setMinutes(0);
                d.setSeconds(0);
                d.setMilliseconds(0);
                return d.toISOString().split("T")[0];
            };
        case "quarter":
            return function(e) {
                var d = new Date(e.time);
                d.setMonth(d.getMonth() - d.getMonth() % 3);
                d.setDate(1);
                d.setHours(0);
                d.setMinutes(0);
                d.setSeconds(0);
                d.setMilliseconds(0);
                return d.toISOString().split("T")[0];
            };
        default:
            throw "invalid unit";
    }
}
