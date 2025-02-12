import { Variables as variables } from './variables.js';
export class DrawingUtils {
    static DrawConnection(ele, callback) {
        const connection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
        variables.ConnectionElement = connection;
        const path = document.createElementNS('http://www.w3.org/2000/svg', "path");
        path.classList.add("main-path");
        path.setAttributeNS(null, 'd', '');
        // path.innerHTML = 'a';
        connection.classList.add("connection");
        connection.appendChild(path);
        variables.PreCanvas.appendChild(connection);
        var id_output = ele.parentElement.parentElement.id.slice(5);
        var output_class = ele.classList[1];
        /**
         * TODO: need to setup callback that points to this.dispatch
         */
        callback('connectionStart', { output_id: id_output, output_class: output_class });
    }
    static CreateCurvature(start_pos_x, start_pos_y, end_pos_x, end_pos_y, curvature_value, type) {
        var line_x = start_pos_x;
        var line_y = start_pos_y;
        var x = end_pos_x;
        var y = end_pos_y;
        var curvature = curvature_value;
        //type openclose open close other
        switch (type) {
            case 'open':
                if (start_pos_x >= end_pos_x) {
                    var hx1 = line_x + Math.abs(x - line_x) * curvature;
                    var hx2 = x - Math.abs(x - line_x) * (curvature * -1);
                }
                else {
                    var hx1 = line_x + Math.abs(x - line_x) * curvature;
                    var hx2 = x - Math.abs(x - line_x) * curvature;
                }
                return ' M ' + line_x + ' ' + line_y + ' C ' + hx1 + ' ' + line_y + ' ' + hx2 + ' ' + y + ' ' + x + '  ' + y;
                break;
            case 'close':
                if (start_pos_x >= end_pos_x) {
                    var hx1 = line_x + Math.abs(x - line_x) * (curvature * -1);
                    var hx2 = x - Math.abs(x - line_x) * curvature;
                }
                else {
                    var hx1 = line_x + Math.abs(x - line_x) * curvature;
                    var hx2 = x - Math.abs(x - line_x) * curvature;
                }
                return ' M ' + line_x + ' ' + line_y + ' C ' + hx1 + ' ' + line_y + ' ' + hx2 + ' ' + y + ' ' + x + '  ' + y;
                break;
            case 'other':
                if (start_pos_x >= end_pos_x) {
                    var hx1 = line_x + Math.abs(x - line_x) * (curvature * -1);
                    var hx2 = x - Math.abs(x - line_x) * (curvature * -1);
                }
                else {
                    var hx1 = line_x + Math.abs(x - line_x) * curvature;
                    var hx2 = x - Math.abs(x - line_x) * curvature;
                }
                return ' M ' + line_x + ' ' + line_y + ' C ' + hx1 + ' ' + line_y + ' ' + hx2 + ' ' + y + ' ' + x + '  ' + y;
                break;
            default:
                var hx1 = line_x + Math.abs(x - line_x) * curvature;
                var hx2 = x - Math.abs(x - line_x) * curvature;
                return ' M ' + line_x + ' ' + line_y + ' C ' + hx1 + ' ' + line_y + ' ' + hx2 + ' ' + y + ' ' + x + '  ' + y;
        }
    }
    static UpdateConnection(eX, eY) {
        const precanvas = variables.PreCanvas;
        const zoom = variables.Zoom;
        let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
        precanvasWitdhZoom = precanvasWitdhZoom || 0;
        let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
        precanvasHeightZoom = precanvasHeightZoom || 0;
        var path = variables.ConnectionElement.children[0];
        var line_x = variables.SelectedElement.offsetWidth / 2 + (variables.SelectedElement.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
        var line_y = variables.SelectedElement.offsetHeight / 2 + (variables.SelectedElement.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;
        var x = eX * (variables.PreCanvas.clientWidth / (variables.PreCanvas.clientWidth * variables.Zoom)) - (variables.PreCanvas.getBoundingClientRect().x * (variables.PreCanvas.clientWidth / (variables.PreCanvas.clientWidth * variables.Zoom)));
        var y = eY * (variables.PreCanvas.clientHeight / (variables.PreCanvas.clientHeight * variables.Zoom)) - (variables.PreCanvas.getBoundingClientRect().y * (variables.PreCanvas.clientHeight / (variables.PreCanvas.clientHeight * variables.Zoom)));
        var curvature = variables.Curvature;
        var lineCurve = DrawingUtils.CreateCurvature(line_x, line_y, x, y, curvature, 'openclose');
        path.setAttributeNS(null, 'd', lineCurve);
    }
}
