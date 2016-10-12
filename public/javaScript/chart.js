/**
 * Created by vitus89 on 12/10/16.
 */
function chartCreate(input){
    var chart = new CanvasJS.Chart(input.nome, {
        title: {
            text: input.text,
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
        data: []
    });
    for(var i=0;i<input.data.length;i++){
        var a = {
                type: "line",
                showInLegend: true,
                lineThickness: 2,
                name: input.data[i].name,
                markerType: "square",
                color: input.data[i].color,
                dataPoints: input.data[i].dataPoints
            };
        chart.options.data.push(a);
    }
    return chart;
}