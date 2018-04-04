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

function date_to_string(dt, unit) {
    var d = new Date(dt);
    switch (unit) {
        case "hour":
            return function(e) {
                d.setMinutes(0);
                d.setSeconds(0);
                d.setMilliseconds(0);
                return d.toISOString();
            };
        case "day":
            return function(e) {
                return d.toISOString().split("T")[0];
            };
        case "week":
            return function(e) {
                var day = d.getDate(),
                    month = d.getMonth(),
                    year = d.getFullYear(),
                    weekday = d.getDay() || 7;

                return (new Date(year, month, day - (weekday - 1))).toISOString().split("T")[0];
            };
        case "month":
            return function(e) {
                d.setDate(1);
                d.setHours(0);
                d.setMinutes(0);
                d.setSeconds(0);
                d.setMilliseconds(0);
                return d.toISOString().split("T")[0];
            };
        case "quarter":
            return function(e) {
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

function get_next_month(start_month) {
    var copy = new Date(start_month);
    copy.setDate(1);
    copy.setHours(0);
    copy.setMinutes(0);
    copy.setSeconds(0);
    copy.setMilliseconds(0);

    copy.setMonth(copy.getMonth() + 1);
    return copy;
}

function month_range(start_month, end_month) {
    if (!(end_month > start_month)) {
        throw "invalid month range";
    }
    var range = [start_month];
    while (range[range.length - 1] < end_month) {
        range.push(get_next_month(range[range.length - 1]));
    }
    return range;
}
