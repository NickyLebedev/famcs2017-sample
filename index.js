'use strict';

var articleModel = (function () {
    var articles = [
        {
            "id": "news/2017/02/28/rossiya-snimet-zapret-na-import-moldavskih-vin",
            "title": "Россия снимет запрет на импорт молдавских вин",
            "author": "fapl",
            "createdAt": new Date("2017-02-28T05:24:23.856Z"),
            "content": "Content of post",
            "summary": "Summary of post"
        },
        {
            "id": "news/2017/02/28/tramp-obvinil-obamu-v-organizatsii-protestov-po-vsey-strane-i-utechek-v-smi",
            "title": "Трамп обвинил Обаму в организации протестов по всей стране и утечек в СМИ",
            "author": "fapl",
            "createdAt": new Date("2017-02-27T05:24:23.316Z"),
            "content": "Content of post",
            "summary": "Summary of post"
        },
        {
            "id": "news/2017/02/28/rosneft-zainteresovalas-dobychey-v-meksikanskom-zalive",
            "title": "«Роснефть» заинтересовалась добычей в Мексиканском заливе",
            "author": "meduza",
            "createdAt": new Date("2017-02-26T05:24:22.818Z"),
            "content": "Content of post",
            "summary": "Summary of post"
        },
        {
            "id": "news/2017/02/28/amerikanskiy-senator-predlozhil-nazvat-imenem-nemtsova-ulitsu-pered-posolstvom-rossii",
            "title": "Американский сенатор предложил назвать именем Немцова улицу перед посольством России",
            "author": "meduza",
            "createdAt": new Date("2017-02-25T05:24:21.043Z"),
            "content": "Content of post",
            "summary": "Summary of post"
        },
        {
            "id": "news/2017/02/28/rossiya-otkazalas-zaderzhat-podozrevaemyh-v-ubiystve-kim-chen-nama",
            "title": "Россия отказалась задержать подозреваемых в убийстве Ким Чен Нама",
            "author": "meduza",
            "createdAt": new Date("2017-02-24T05:24:19.591Z"),
            "content": "Content of post",
            "summary": "Summary of post"
        },
        {
            "id": "news/2017/02/28/spacex-anonsiroval-polet-kosmicheskih-turistov-k-lune-v-2018-godu",
            "title": "SpaceX пообещала отправить космических туристов к Луне в 2018 году",
            "author": "meduza",
            "createdAt": new Date("2017-02-22T05:23:51.252Z"),
            "content": "Content of post",
            "summary": "Summary of post"
        },
        {
            "id": "news/2017/02/27/v-avstrii-vyhodtsa-iz-chechni-prigovorili-k-2-5-godam-tyurmy-za-uchastie-v-boyah-na-storone-ig",
            "title": "В Австрии выходца из Чечни приговорили к 2,5 годам тюрьмы за участие в боях на стороне ИГ",
            "author": "ria",
            "createdAt": new Date("2017-02-21T05:23:47.871Z"),
            "content": "Content of post",
            "summary": "Summary of post"
        },
        {
            "id": "news/2017/02/27/v-peterburge-zaderzhali-uchastnika-aktsii-lgbt-spetsnaza-proshedshey-23-fevralya",
            "title": "В Петербурге задержали участника акции «ЛГБТ-спецназа», прошедшей 23 февраля",
            "author": "ria",
            "createdAt": new Date("2017-01-18T05:23:45.059Z"),
            "content": "Content of post",
            "summary": "Summary of post"
        },
        {
            "id": "news/2017/02/27/nikolay-karachentsov-gospitalizirovan-posle-dtp-v-podmoskovie",
            "title": "Николай Караченцов госпитализирован после ДТП в Подмосковье",
            "author": "meduza",
            "createdAt": new Date("2017-01-16T05:23:41.378Z"),
            "content": "Content of post",
            "summary": "Summary of post"
        },
        {
            "id": "news/2017/02/27/id-kommersant-nachnet-vypuskat-pod-nazvaniem-dengi-reklamnoe-prilozhenie",
            "title": "ИД «Коммерсант» начнет выпускать под названием «Деньги» рекламное приложение",
            "author": "ria",
            "createdAt": new Date("2017-01-15T05:23:36.803Z"),
            "content": "Content of post",
            "summary": "Summary of post"
        }
    ];

    function getArticles(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 10;
        return filterArticles(articles, filterConfig).slice(skip, skip + top);
    }

    function filterArticles(articles, config) {
        if (config && config.author) {
            return articles.filter(function (article) {
                return article.author === config.author;
            });
        } else {
            return articles;
        }
    }

    function getTotalItems(config) {
        return filterArticles(articles, config).length;
    }

    return {
        getArticles: getArticles,
        getTotal: getTotalItems
    }
})();

var renderer = (function () {
    var articleTemplate, articleListNode;
    function init() {
        
        articleTemplate = document.querySelector('#template-article-list-item');
        articleListNode = document.querySelector('.article-list');
    }

    function insertArticlesInDOM(articles) {
        var articleNodes = renderArticles(articles);

        articleNodes.forEach(function (articleNode) {
            articleListNode.appendChild(articleNode);
        });
    }

    function renderArticles(articles) {
        return articles.map(function (article) {
            return renderArticle(article);
        });
    }

    function renderArticle(article) {
        
        var template = articleTemplate;
        template.content.querySelector('.article-list-item').dataset.id = article.id;
        template.content.querySelector('.article-list-item-title').textContent = article.title;
        template.content.querySelector('.article-list-item-summary').textContent = article.summary;
        template.content.querySelector('.article-list-item-author').textContent = article.author;
        template.content.querySelector('.article-list-item-date').textContent = formatDate(article.createdAt);

        return template.content.querySelector('.article-list-item').cloneNode(true);
    }

    function removeAll() {
        articleListNode.innerHTML = '';
    }

    function formatDate(d) {
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' +
            d.getHours() + ':' + d.getMinutes();
    }

    return {
        init: init,
        insertArticlesInDOM: insertArticlesInDOM,
        removeArticlesFromDOM: removeAll
    }
})();

var filter = (function () {
    var form, submitButton;
    var ALL_AUTHORS = 'all';

    function init(callback) {
        form = document.forms.filter;
        submitButton = form.elements.submit;
        submitButton.addEventListener('click', function () {
            callback(getFilterConfig());
        });

        return getFilterConfig();;
    }

    function getFilterConfig() {
        var author = form.elements.author;
        return (author.value === ALL_AUTHORS)
            ? {}
            : { author: author.value };
    }

    return {
        init: init
    }

})();

var paggination = (function () {
    var currentPage, paginationPages, totalPages;
    var PAGINATION_ITEMS_NUMBER = 4;
    var ITEMS_PER_PAGE = 3;

    function init(total, callback) {
        paginationPages = document.querySelector('.pagination-pages');
        currentPage = 1;
        totalPages = getPagesNumber(total);
        renderPagination(totalPages, currentPage);

        document.querySelector('.pagination-bar').addEventListener('click', function (e) {
            if (e.target.value && e.target.className.indexOf('pagination-item') !== -1) {
                currentPage = e.target.value;
                updatePagination(totalPages, currentPage, callback);
            } else if (e.target.className.indexOf('left-btn') != -1 && currentPage !== 1) {
                updatePagination(totalPages, --currentPage, callback);
            } else if (e.target.className.indexOf('right-btn') != -1 && currentPage !== totalPages) {
                updatePagination(totalPages, ++currentPage, callback);
            }
        });
        return getPaginationParams(currentPage);
    }

    function getPagesNumber(total) {
        return Math.ceil(total / ITEMS_PER_PAGE);
    }

    function getPaginationParams(page) {
        return {
            skip: (page - 1) * ITEMS_PER_PAGE,
            top: ITEMS_PER_PAGE
        }
    }

    function renderPagination(totalPages, current) {
        paginationPages.innerHTML = '';
        for (var i = 0; i < totalPages; i++) {
            paginationPages.appendChild(renderPage(i + 1, i + 1 === current));
        }
    }

    function renderPage(page, active) {
        var pageElement = document.createElement('span');
        pageElement.className = active 
            ? 'pagination-item active'
            : 'pagination-item';
        pageElement.value = page;
        pageElement.innerHTML = page;
        return pageElement;
    }

    function updatePagination(totalPages, currentPage, callback) {
        renderPagination(totalPages, currentPage);
        var params = getPaginationParams(currentPage);
        callback(params.skip, params.top);
    }

    return {
        init: init
    }
})();

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    renderer.init();
    var config = filter.init(filterCallback);

    function filterCallback(config) {
        var total = articleModel.getTotal(config);
        renderer.removeArticlesFromDOM();

        var paginationParams = paggination.init(total, function (skip, top) {
            renderer.removeArticlesFromDOM();
            render(skip, top, config);
        });

        render(paginationParams.skip, paginationParams.top, config);
    }

    filterCallback(config);
}

function render(skip, top, config) {
    var articles = articleModel.getArticles(skip, top, config);

    return renderer.insertArticlesInDOM(articles);
}