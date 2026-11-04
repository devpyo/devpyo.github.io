(function () {
  'use strict';
  var table = document.getElementById('class-table');
  var tool = document.getElementById('tool');
  if (!table || !tool) return;

  var TO_ADDR = 'dev.pyo@gmail.com';
  var GROUPS = [
    { key: 'have', label: '기존 구조로 되는 것', short: '기존', chip: 'have' },
    { key: 'partial', label: '일부 재사용', short: '일부 재사용', chip: 'partial' },
    { key: 'new', label: '새로 개발할 것', short: '새로 개발', chip: 'new' }
  ];

  // 분류의 단일 출처는 정적 분류표(tr[data-group])이다.
  var items = Array.prototype.map.call(table.querySelectorAll('tbody tr[data-group]'), function (tr, i) {
    return {
      id: 'pick-' + i,
      group: tr.getAttribute('data-group'),
      order: Number(tr.getAttribute('data-order')) || i,
      name: tr.querySelector('th').textContent.trim(),
      note: tr.querySelector('td.note-cell').textContent.trim()
    };
  }).sort(function (a, b) { return a.order - b.order; });

  var picks = document.getElementById('picks');
  var summary = document.getElementById('summary');
  var groupsBox = document.getElementById('groups');
  var mailRow = document.getElementById('mail-row');
  var mail = document.getElementById('mail');
  var boxes = [];

  items.forEach(function (it) {
    var label = document.createElement('label');
    label.className = 'pick';
    label.setAttribute('for', it.id);
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.id = it.id;
    input.addEventListener('change', render);
    var text = document.createElement('span');
    text.textContent = it.name;
    label.appendChild(input);
    label.appendChild(text);
    picks.appendChild(label);
    boxes.push({ item: it, input: input });
  });

  document.getElementById('reset').addEventListener('click', function () {
    boxes.forEach(function (b) { b.input.checked = false; });
    render();
  });

  function selected() {
    return boxes.filter(function (b) { return b.input.checked; }).map(function (b) { return b.item; });
  }

  function render() {
    var sel = selected();
    var counts = {};
    GROUPS.forEach(function (g) {
      counts[g.key] = sel.filter(function (it) { return it.group === g.key; });
    });
    groupsBox.textContent = '';

    if (sel.length === 0) {
      summary.textContent = '선택한 항목이 없습니다.';
      var hint = document.createElement('p');
      hint.className = 'fine';
      hint.textContent = '필요한 기능을 체크하면 세 묶음으로 나눠 보여 드립니다.';
      groupsBox.appendChild(hint);
      mailRow.hidden = true;
      return;
    }

    var line = GROUPS.map(function (g) { return g.short + ' ' + counts[g.key].length; }).join(' · ');
    summary.textContent = line;

    GROUPS.forEach(function (g) {
      var list = counts[g.key];
      if (!list.length) return;
      var head = document.createElement('div');
      head.className = 'gt';
      var chip = document.createElement('span');
      chip.className = 'chip ' + g.chip;
      chip.textContent = g.short;
      var title = document.createElement('span');
      title.textContent = g.label + ' ' + list.length + '개';
      head.appendChild(chip);
      head.appendChild(title);
      var ul = document.createElement('ul');
      list.forEach(function (it) {
        var li = document.createElement('li');
        li.textContent = it.name;
        if (it.note) {
          var small = document.createElement('small');
          small.textContent = it.note;
          li.appendChild(small);
        }
        ul.appendChild(li);
      });
      groupsBox.appendChild(head);
      groupsBox.appendChild(ul);
    });

    var body = ['선택한 기능과 분류입니다.', ''];
    GROUPS.forEach(function (g) {
      body.push('[' + g.label + '] ' + counts[g.key].length + '개');
      counts[g.key].forEach(function (it) { body.push('- ' + it.name); });
      if (!counts[g.key].length) body.push('- 없음');
      body.push('');
    });
    body.push('프로젝트 개요를 아래에 적어 주세요.');
    mail.href = 'mailto:' + TO_ADDR +
      '?subject=' + encodeURIComponent('범위 문의: ' + line) +
      '&body=' + encodeURIComponent(body.join('\r\n'));
    mailRow.hidden = false;
  }

  tool.hidden = false;
  render();
  // 뒤로 가기 복원 등으로 체크 상태가 남아 있어도 화면을 실제 상태에 맞춘다.
  window.addEventListener('pageshow', render);
})();
