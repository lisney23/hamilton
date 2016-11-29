import React from 'react';
import * as d3 from "d3";
import _ from 'lodash';

var fontSize = 12;
var Songs = {
  drawLines(ctx, songs, interpolate, props) {
    var fill = d3.interpolateRgb('#fff', props.fontColor)(interpolate);
    ctx.fillStyle = fill;
    ctx.strokeStyle = fill;

    _.each(songs, song => {
      // first write text
      ctx.font = fontSize + 'px ' + props.bodyFont;
      ctx.textAlign = 'left';
      ctx.fillText(song.name, song.x + 5, song.y + props.top - 2);

      this.drawRows(ctx, song, song.rows, props.top);
      this.drawColumns(ctx, song, song.columns, props.top);
    });
  },

  moveLines(ctx, songs, top, props) {
    ctx.fillStyle = props.fontColor;
    ctx.strokeStyle = props.fontColor;

    _.each(songs, song => {
      // first write text
      ctx.font = '12px ' + props.bodyFont;
      ctx.textAlign = 'left';
      ctx.fillText(song.name, song.x + 5, song.y + top - 2);

      this.drawRows(ctx, song, song.rows, top);
      this.drawColumns(ctx, song, song.columns, top);
    });
  },

  drawRows(ctx, song, rows, top) {
    _.each(rows, row => {
      var y = song.y + row + top;
      ctx.beginPath();
      ctx.moveTo(song.x, y);
      ctx.lineTo(song.x + song.width, y);
      ctx.stroke();
    });
  },

  drawColumns(ctx, song, columns, top) {
    _.each(columns, column => {
      var x = song.x + column[1];

      ctx.beginPath();
      ctx.moveTo(x, song.y + top);
      ctx.lineTo(x, song.y + song.height + top);
      ctx.lineWidth = column[0];
      ctx.stroke();
    });
  },

  highlightSong(ctx, songs, highlightedSong, top, interpolate) {
    _.each(songs, song => {
      var opacity = 0;
      if (highlightedSong) {
        var highlighted = song.id === highlightedSong;
        opacity = highlighted ? 0 : d3.interpolateNumber(0, 0.65)(interpolate);
      }

      ctx.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';
      ctx.fillRect(song.x, song.y + top - fontSize,
        song.width + 2, song.height + fontSize + 5);
    });
  },
};

export default Songs;
