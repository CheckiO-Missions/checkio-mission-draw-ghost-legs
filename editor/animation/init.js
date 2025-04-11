requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function draw_ghost_legs_visualization(tgt_node, data) {
            if (! data || ! data.ext) {
                return
            }
            /**
             * list_to_tuple (function)
             * [[1, 2], [3, 4, 5], ...] --> [(1, 2), (3, 4, 5), ...]
             */
            function list_to_tuple(ls) {
                let result = ''
                ls.forEach((xs) => {
                    result += '('
                    xs.values.forEach((x) => {
                        result += x + ','
                    })
                    if (xs.values.length > 1) {
                        result = result.slice(0, -1)
                    }
                    result += '), '
                })
                return '[' + result.slice(0, -2) + ']'
            }
            /**
             * edit output value
             */
            try {
                $(tgt_node.parentNode).find(".output").text('Your result:' + list_to_tuple(data.out))
            } catch (e) {
                $(tgt_node.parentNode).find(".output").text('Your result:' + JSON.stringify(data.out))
                return
            }
            /**
             * guard
             */
            if (! data.ext.result) {
                return
            }
            /**
             * attr
             */
            const attr = {
                'numbers': {
                    'font-size': '14px',
                    'font-family': 'Times',
                    'font-weight': 'bold',
                    'fill': '#294270',
                },
                'v_lines': {
                    'stroke-width': '2.5px',
                    'stroke': '#294270',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                },
                'h_lines': {
                    'stroke-width': '2.5px',
                    'stroke': '#F0801A',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                },
            }
            /**
             * values
             */
            const input = data.in
            const output = data.out
            const os = 10
            const number_height = 20
            const lead_length = 17
            const v_unit = 20
            const unit = Math.min(200 / input[0].length, 30)
            const grid_seize_px_w = unit * (input[0].length - 1) + os * 2
            const last_leg_positions = Array(input[0].length + 1)
            const each_leg_positions = []
            last_leg_positions.fill(-1)
            output.forEach(o => {
                const a = Math.min(...o.values)
                last_leg_positions[a] = Math.max(...last_leg_positions.slice(a - 1, a + 2)) + 1
                each_leg_positions.push(last_leg_positions[a])
            })
            const leg_num = Math.max(...last_leg_positions)
            const grid_seize_px_h = v_unit * leg_num + (number_height + lead_length + os) * 2
            /**
             * paper
             */
            const paper = Raphael(tgt_node, grid_seize_px_w, grid_seize_px_h)
            /**
             * draw top numbers
             */
            for (let i = 0; i < input[0].length; i += 1) {
                paper.text(os + unit * i, os + number_height / 2, i + 1).attr(attr.numbers)
            }
            /**
             * draw horizontal lines
             */
            output.forEach((o, i) => {
                const a = Math.min(...o.values)
                paper.path(
                    [
                        'M', (a - 1) * unit + os,
                        each_leg_positions[i] * v_unit + lead_length + os + number_height,
                        'h', unit
                    ]
                ).attr(attr.h_lines)
            })
            /**
             * draw vertical lines
             */
            for (let i = 0; i < input[0].length; i += 1) {
                paper.path(
                    [
                        'M', i * unit + os, os + number_height,
                        'v', leg_num * v_unit + lead_length * 2
                    ]
                ).attr(attr.v_lines)
            }
            /**
             * draw bottom numbers
             */
            input[0].forEach((b, i) => {
                paper.text(os + unit * i,
                    os + number_height + lead_length * 2 + v_unit * leg_num + number_height / 2,
                    b).attr(attr.numbers)
            })
        }
        var io = new extIO({
            animation: function ($expl, data) {
                draw_ghost_legs_visualization(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
