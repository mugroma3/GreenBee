/**
 * Created by vitus89 on 12/10/16.
 */
function chartCentralina(input){
    var battery_centralina = [];
    var luminosity_centralina = [];
    for (var i = 0; i < input.length; i++) {
        battery_centralina.push({x: new Date(input[i].Data), y: input[i].battery_lvl});
        luminosity_centralina.push({x: new Date(input[i].Data), y: input[i].luminosity});
    }
    var chart = new CanvasJS.Chart(input[0].name, {
        title: {
            text: "Dati della centralina " + input[0].name,
            fontSize: 30
        },
        animationEnabled: true,
        axisX: {
            gridColor: "Silver",
            tickColor: "silver",
            valueFormatString: "DD/MMM HH:MM"
        },
        toolTip: {
            shared: true
        },
        theme: "theme2",
        axisY: {
            gridColor: "Silver",
            tickColor: "silver"
        },
        legend: {
            verticalAlign: "center",
            horizontalAlign: "right"
        },
        data: [
            {
                type: "line",
                showInLegend: true,
                lineThickness: 2,
                name: "Battery Level",
                markerType: "square",
                color: "#20d43e",
                dataPoints: battery_centralina
            },
            {
                type: "line",
                showInLegend: true,
                name: "Luminosity",
                color: "#ffe700",
                lineThickness: 2,
                dataPoints: luminosity_centralina
            }
        ]
    });
    return chart;
}

function chartSensore(input, indexSensore){
    var battery_ble = [];
    var humidity_gnd_ble = [];
    var humidity_air_ble = [];
    var ph_ble = [];
    var temperature_ble = [];
    for (var i = 0; i < input.length; i++) {
        if(input[i].ble_servers[indexSensore].reachable == 'yes'){
            battery_ble.push({x: new Date(input[i].Data), y: input[i].ble_servers[indexSensore].battery_lvl});
            humidity_gnd_ble.push({x: new Date(input[i].Data), y: input[i].ble_servers[indexSensore].humidity_gnd});
            humidity_air_ble.push({x: new Date(input[i].Data), y: input[i].ble_servers[indexSensore].humidity_air});
            ph_ble.push({x: new Date(input[i].Data), y: input[i].ble_servers[indexSensore].ph});
            temperature_ble.push({x: new Date(input[i].Data), y: input[i].ble_servers[indexSensore].temperature});
        }
    }
    var chart = new CanvasJS.Chart(input[0].ble_servers[indexSensore].id_ble, {
        title: {
            text: "Dati del sensore " + input[0].ble_servers[indexSensore].id_ble,
            fontSize: 30
        },
        animationEnabled: true,
        axisX: {
            gridColor: "Silver",
            tickColor: "silver",
            valueFormatString: "DD/MMM HH:MM"
        },
        legend: {
            verticalAlign: "center",
            horizontalAlign: "right"
        },
        toolTip: {
            shared: true
        },
        theme: "theme2",
        axisY: {
            gridColor: "Silver",
            tickColor: "silver"
        },

        data: [
            {
                type: "line",
                showInLegend: true,
                lineThickness: 2,
                name: "Battery Level",
                markerType: "square",
                color: "#20d43e",
                dataPoints: battery_ble
            },
            {
                type: "line",
                showInLegend: true,
                name: "Humidity Land",
                color: "#c3bf7f",
                lineThickness: 2,
                dataPoints: humidity_gnd_ble
            },
            {
                type: "line",
                showInLegend: true,
                name: "Humidity Air",
                color: "#00cef5",
                lineThickness: 2,
                dataPoints: humidity_air_ble
            },
            {
                type: "line",
                showInLegend: true,
                name: "PH",
                color: "#794c79",
                lineThickness: 2,
                dataPoints: ph_ble
            },
            {
                type: "line",
                showInLegend: true,
                name: "Temperature",
                color: "#f4200d",
                lineThickness: 2,
                dataPoints: temperature_ble
            }
        ]
    });
    return chart;
}