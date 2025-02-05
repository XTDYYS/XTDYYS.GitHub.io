// 每页显示的项目数量
const itemsPerPage = 5;
// 获取所有下载项目
const downloadItems = document.querySelectorAll('.download-item');
// 获取分页容器
const pagination = document.getElementById('pagination');
// 获取搜索输入框
const searchInput = document.getElementById('search-input');
// 获取主内容区域
const mainContent = document.getElementById('main-content');

// 计算总页数
const totalPages = Math.ceil(downloadItems.length / itemsPerPage);

// 初始化当前页码
let currentPage = 1;

// 显示指定页码的项目
function showPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    downloadItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// 生成分页按钮
function generatePagination() {
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            showPage(currentPage);
            // 高亮当前页码按钮
            document.querySelectorAll('#pagination button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
        pagination.appendChild(button);
    }
    // 高亮当前页码按钮
    const currentButton = pagination.querySelector(`button:nth-child(${currentPage})`);
    if (currentButton) {
        currentButton.classList.add('active');
    }
}

// 搜索功能
searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filteredItems = Array.from(downloadItems).filter(item => {
        const title = item.querySelector('h2').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        return title.includes(searchTerm) || description.includes(searchTerm);
    });

    // 重新计算总页数
    const newTotalPages = Math.ceil(filteredItems.length / itemsPerPage);
    currentPage = 1;

    // 显示搜索结果
    downloadItems.forEach(item => {
        item.style.display = 'none';
    });
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    filteredItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.style.display = 'block';
        }
    });

    // 重新生成分页按钮
    generatePagination();
});

// 初始化显示第一页
showPage(currentPage);
// 生成初始分页按钮
generatePagination();