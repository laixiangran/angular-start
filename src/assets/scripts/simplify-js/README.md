Simplify.js is a high-performance JavaScript polyline simplification library by Vladimir Agafonkin, extracted from [Leaflet](http://leafletjs.com).

# usage

## simplify(points, tolerance, highQuality)

Returns an array of simplified points.

### points `[Array]`

An array of points of [x: Number, y: Number] format.

### tolerance `[Number]` (optional, 1 by default)

Affects the amount of simplification (in the same metric as the point coordinates).

### highQuality `[Boolean]` (optional, false by default)

Excludes distance-based preprocessing step which leads to highest quality simplification but runs `~10-20 times` slower.
