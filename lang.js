/* 语言切换。默认英文；选择记在 localStorage，两个页面共享。
   注意：设置 data-lang 的那段脚本必须**内联在 <head> 里**先跑一遍，
   否则会先按默认语言画一帧再跳，肉眼可见地闪。这里只负责按钮交互。 */
(function () {
  var KEY = 'napkin-lang';

  function apply(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-Hans' : 'en');
    document.querySelectorAll('.langtoggle button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    // 标题不在正文里，CSS 的显隐规则够不着，只能手动换
    var t = document.querySelector('[data-title-' + lang + ']');
    if (t) document.title = t.getAttribute('data-title-' + lang);
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('.langtoggle button');
    if (!b) return;
    try { localStorage.setItem(KEY, b.dataset.lang); } catch (_) {}
    apply(b.dataset.lang);
  });

  apply(document.documentElement.getAttribute('data-lang') || 'en');
})();
