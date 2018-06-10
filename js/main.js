jQuery(function() {
	var $sidebar = $('#sidebar'),
		$nav = $('.nav'),
		$mainNav = $('.nav li a'),
		$main = $('.main');

	var found = true;

	var $el;

	$mainNav.on('click', function(e){
		e.preventDefault;
		//alert("sdsdsss " + $(this).prev());
		// var txt = $(this).text() == "Applications"?"CLOSE":"Applications";
  //       $(this).text(txt);
        $(this).next('ul').toggle();
	});

	$sidebar.find('a').click(function() {
		$('body').removeClass('nav-open');
	});

	$("section > div.highlighter-rouge:first-of-type").each(function(i) {

		var $this = $(this).before("<ul class=\"languages\"></ul>"),
		$languages = $this.prev(),
		$notFirst = $this.nextUntil(":not(div.highlighter-rouge)"),
		$all = $this.add($notFirst);

		$all.add($languages).wrapAll("<div class=\"code-viewer\"></div>");


		listLanguages($all, $languages);

		$this.css('display', 'block');
		$notFirst.css('display', 'none');

		$languages.find('a').first().addClass('active');

		$languages.find('a').click(function() {
			$all.css('display', 'none');
			$all.eq($(this).parent().index()).css('display', 'block');

			$languages.find('a').removeClass('active');
			$(this).addClass('active');
			return false;
		});

		if ($languages.children().length === 0) {
			$languages.remove();
		}
	});

	function listLanguages($el, $insert) {
		$el.each(function(i) {
			var title = $(this).attr('title');
			if (title) {
				$insert.append("<li><a href=\"#\">" + title + "</a></li>");
			}
		});
	}

	var href = $('.sidebar a').first().attr("href");

	if (href !== undefined && href.charAt(0) === "#") {
		setActiveSidebarLink();

		$(window).on("scroll", function(evt) {
			setActiveSidebarLink();
		});
	}

	function setActiveSidebarLink() {
			$('.sidebar a').removeClass('active');
				var $closest = getClosestHeader();
				$closest.addClass('active');
				document.title = $closest.text();

	}
});

function getClosestHeader() {
	var $links = $('.sidebar a'),
	top = window.scrollY,
	$last = $links.first();

	if (top < 300) {
		return $last;
	}

	if (top + window.innerHeight >= $(".main").height()) {
		return $links.last();
	}

	for (var i = 0; i < $links.length; i++) {
		var $link = $links.eq(i),
		href = $link.attr("href");

		if (href !== undefined && href.charAt(0) === "#" && href.length > 1) {
			var $anchor = $(href);

			if ($anchor.length > 0) {
				var offset = $anchor.offset();

				if (top < offset.top - 300) {
					return $last;
				}

				$last = $link;
			}
		}
	}
	return $last;
}

$(window).load(function () {
  var url = window.location.href;
var pos1 = url.indexOf("/");
var res = url.substring(pos1+2, url.length);
var pos2 = res.indexOf("/");
var res1 = res.substring(pos2+1, res.length);
var pos3 = res1.indexOf("/");
var res2 = res1.substring(0, pos3);
var elem = "section"+"_"+res2;
var contents = $('#'+elem); 
contents.attr('style','display: block');
});
