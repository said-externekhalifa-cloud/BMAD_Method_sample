// Variable globale pour conserver la référence à la racine du graphique (root)
let chartRoot = null;

/**
 * Initialise ou met à jour un graphique en barres amCharts 5.
 * @param {Array} data - Un tableau d'objets produits, chacun avec les propriétés 'name' et 'stock'.
 */
function updateChart(data) {
  // S'il n'y a pas de racine de graphique, on la crée.
  // Cela garantit que le graphique n'est initialisé qu'une seule fois.
  if (chartRoot) {
    // Si le graphique existe déjà, on le dispose pour le recréer
    // afin d'appliquer les nouveaux paramètres d'axe plus facilement.
    // Cela pourrait être optimisé en mettant à jour les données existantes,
    // mais pour un changement de type d'axe, une recréation est plus simple.
    chartRoot.dispose();
    chartRoot = null; // Réinitialiser pour forcer la recréation
  }

  chartRoot = am5.Root.new("chartdiv");

  // Appliquer des thèmes
  chartRoot.setThemes([
    am5themes_Animated.new(chartRoot)
  ]);

  // Crée le graphique principal
  let chart = chartRoot.container.children.push(am5xy.XYChart.new(chartRoot, {
    panX: false, // Désactiver le panoramique sur X pour les barres horizontales
    panY: false, // Désactiver le panoramique sur Y
    wheelX: "panY", // Faire défiler l'axe Y (catégories) avec la molette
    wheelY: "zoomY", // Zoomer sur l'axe Y
    layout: chartRoot.verticalLayout // Le layout reste vertical, les barres sont horizontales
  }));

  // Crée l'axe Y (pour les catégories : noms des produits)
  let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(chartRoot, {
    categoryField: "category",
    renderer: am5xy.AxisRendererY.new(chartRoot, {
      minGridDistance: 30
    }),
    tooltip: am5.Tooltip.new(chartRoot, {})
  }));

  // Crée l'axe X (pour les valeurs : stock)
  let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(chartRoot, {
    renderer: am5xy.AxisRendererX.new(chartRoot, {})
  }));

  // Crée les séries (barres)
  let series = chart.series.push(am5xy.ColumnSeries.new(chartRoot, {
    name: "Stock", // Changer le nom de la série
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "stock", // Valeurs sur l'axe X
    categoryYField: "category", // Catégories sur l'axe Y
    tooltip: am5.Tooltip.new(chartRoot, {
        labelText: "{categoryY}: {valueX}" // Adapter le tooltip
    })
  }));
  
  // Appliquer des couleurs
  series.columns.template.setAll({
    fillOpacity: 0.5,
    strokeWidth: 2,
    height: am5.percent(80) // Rendre les barres plus épaisses
  });
  series.columns.template.adapters.add("fill", function(fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });
  series.columns.template.adapters.add("stroke", function(stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  // Associer les données aux axes et aux séries
  yAxis.data.setAll(data);
  series.data.setAll(data);

  // Animer le rendu du graphique
  series.appear(1000);
  chart.appear(1000, 100);
}

