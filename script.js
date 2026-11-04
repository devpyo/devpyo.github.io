(function () {
  'use strict';
  var table = document.getElementById('class-table');
  var result = document.getElementById('result');
  if (!table || !result) return;

  var TO_ADDR = 'dev.pyo@gmail.com';
  var GROUPS = [
    { key: 'have', label: '기존 구조로 되는 것', short: '기존', mark: '●' },
    { key: 'partial', label: '일부 재사용', short: '일부 재사용', mark: '◐' },
    { key: 'new', label: '새로 개발할 것', short: '새로 개발', mark: '○' }
  ];
  var summary = document.getElementById('summary');
  var groupsBox = document.getElementById('groups');
  var mail = document.getElementById('mail');
  var reset = document.getElementById('reset');

  // 분류의 단일 출처는 표의 tr[data-group]이다. 표 행에 체크 상자를 붙인다.
  var items = Array.prototype.map.call(table.querySelectorAll('tbody tr[data-group]'), function (tr, i) {
    var th = tr.querySelector('th');
    var name = th.textContent.trim();
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'pick-' + i;
    input.addEventListener('change', render);
    var label = document.createElement('label');
    label.className = 'pick';
    label.setAttribute('for', input.id);
    label.appendChild(input);
    label.appendChild(document.createTextNode(name));
    th.textContent = '';
    th.appendChild(label);
    return { input: input, group: tr.getAttribute('data-group'), name: name, note: tr.querySelector('td.note-cell').textContent.trim() };
  });

  reset.addEventListener('click', function () {
    items.forEach(function (it) { it.input.checked = false; });
    render();
  });

  function render() {
    var sel = items.filter(function (it) { return it.input.checked; });
    groupsBox.textContent = '';
    mail.hidden = reset.hidden = sel.length === 0;
    if (sel.length === 0) {
      summary.textContent = '선택한 기능이 없습니다. 표에서 필요한 기능에 체크하세요.';
      return;
    }

    var by = {};
    GROUPS.forEach(function (g) {
      by[g.key] = sel.filter(function (it) { return it.group === g.key; });
    });
    var line = GROUPS.map(function (g) { return g.short + ' ' + by[g.key].length; }).join(' · ');
    summary.textContent = line;

    GROUPS.forEach(function (g) {
      if (!by[g.key].length) return;
      var head = document.createElement('p');
      head.className = 'gt';
      head.textContent = g.mark + ' ' + g.label + ' ' + by[g.key].length + '개';
      var ul = document.createElement('ul');
      by[g.key].forEach(function (it) {
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
      body.push('[' + g.label + '] ' + by[g.key].length + '개');
      by[g.key].forEach(function (it) { body.push('- ' + it.name); });
      if (!by[g.key].length) body.push('- 없음');
      body.push('');
    });
    body.push('프로젝트 개요를 아래에 적어 주세요.');
    mail.href = 'mailto:' + TO_ADDR +
      '?subject=' + encodeURIComponent('범위 문의: ' + line) +
      '&body=' + encodeURIComponent(body.join('\r\n'));
  }

  result.hidden = false;
  render();
  // 뒤로 가기 복원 등으로 체크 상태가 남아 있어도 화면을 실제 상태에 맞춘다.
  window.addEventListener('pageshow', render);
})();
