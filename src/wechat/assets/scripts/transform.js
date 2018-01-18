/**
 * Created by laixiangran on 2018/1/16.
 * homepage：http://www.laixiangran.cn.
 * Transform coordinate between earth(WGS-84) and mars in china(GCJ-02).
 * 地理坐标(WGS-84)、火星坐标(GCJ-02)、百度系坐标互转
 */

(function (window) {
	var earthR = 6378137.0;

	function outOfChina(lng, lat) {
		if ((lng < 72.004) || (lng > 137.8347)) {
			return true;
		}
		if ((lat < 0.8293) || (lat > 55.8271)) {
			return true;
		}
		return false;
	}

	function transform(x, y) {
		var xy = x * y,
			absX = Math.sqrt(Math.abs(x)),
			xPi = x * Math.PI,
			yPi = y * Math.PI,
			d = 20.0 * Math.sin(6.0 * xPi) + 20.0 * Math.sin(2.0 * xPi);
		var lat = d,
			lng = d;
		lat += 20.0 * Math.sin(yPi) + 40.0 * Math.sin(yPi / 3.0);
		lng += 20.0 * Math.sin(xPi) + 40.0 * Math.sin(xPi / 3.0);
		lat += 160.0 * Math.sin(yPi / 12.0) + 320 * Math.sin(yPi / 30.0);
		lng += 150.0 * Math.sin(xPi / 12.0) + 300.0 * Math.sin(xPi / 30.0);
		lat *= 2.0 / 3.0;
		lng *= 2.0 / 3.0;
		lat += -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * xy + 0.2 * absX;
		lng += 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * xy + 0.1 * absX;
		return {lat: lat, lng: lng}
	}

	function delta(lng, lat) {
		var ee = 0.00669342162296594323,
			d = transform(lng - 105.0, lat - 35.0),
			radLat = lat / 180.0 * Math.PI;
		var magic = Math.sin(radLat);
		magic = 1 - ee * magic * magic;
		var sqrtMagic = Math.sqrt(magic);
		d.lat = (d.lat * 180.0) / ((earthR * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
		d.lng = (d.lng * 180.0) / (earthR / sqrtMagic * Math.cos(radLat) * Math.PI);
		return d;
	}

	function wgs2gcj(wgsLng, wgsLat) {
		if (outOfChina(wgsLng, wgsLat)) {
			return {lat: wgsLat, lng: wgsLng};
		}
		var d = delta(wgsLng, wgsLat);
		return {lat: wgsLat + d.lat, lng: wgsLng + d.lng};
	}

	function gcj2wgs(gcjLng, gcjLat) {
		if (outOfChina(gcjLng, gcjLat)) {
			return {lat: gcjLat, lng: gcjLng};
		}
		var d = delta(gcjLng, gcjLat);
		return {lat: gcjLat - d.lat, lng: gcjLng - d.lng};
	}

	window.transform = {
		wgs2gcj: wgs2gcj,
		gcj2wgs: gcj2wgs
	};
})(window);
