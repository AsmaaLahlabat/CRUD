// عناصر الإدخال
const courseName = document.getElementById('courseName');
const courseCategory = document.getElementById('courseCategory');
const coursePrice = document.getElementById('coursePrice');
const courseDescription = document.getElementById('courseDescription');
const courseCapacity = document.getElementById('courseCapacity');
const addCourseBtn = document.getElementById('click');
const deleteAllBtn = document.getElementById('deleteBtn');
const dataTable = document.getElementById('data');
const searchInput = document.getElementById('search');

let courses = []; // لتخزين الكورسات
let currentIndex = -1; // لتحديد الصف الذي يتم تحديثه

// دالة للتحقق من الإدخال
function validateInputs() {
    if (
        courseName.value === '' ||
        courseCategory.value === '' ||
        coursePrice.value === '' ||
        courseDescription.value === '' ||
        courseCapacity.value === ''
    ) {
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'يرجى تعبئة جميع الحقول!'
        });
        return false;
    }
    return true;
}

// دالة لإضافة أو تعديل كورس
function addCourse() {
    if (!validateInputs()) return;

    const course = {
        name: courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        description: courseDescription.value,
        capacity: courseCapacity.value,
    };

    if (currentIndex === -1) {
        // إذا لم يكن هناك تعديل، قم بإضافة الكورس الجديد
        courses.push(course);
        Swal.fire({
            icon: 'success',
            title: 'تم الإضافة',
            text: 'تمت إضافة الكورس بنجاح!'
        });
    } else {
        // تعديل الكورس الموجود
        courses[currentIndex] = course;
        currentIndex = -1; // إعادة المؤشر
        Swal.fire({
            icon: 'success',
            title: 'تم التحديث',
            text: 'تم تعديل الكورس بنجاح!'
        });
    }

    clearInputs();
    displayCourses();
    addCourseBtn.value = 'Add Course'; // إعادة نص الزر
}

// دالة لمسح الحقول
function clearInputs() {
    courseName.value = '';
    courseCategory.value = '';
    coursePrice.value = '';
    courseDescription.value = '';
    courseCapacity.value = '';
}

// دالة لعرض الكورسات
function displayCourses() {
    dataTable.innerHTML = '';
    courses.forEach((course, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${course.name}</td>
                <td>${course.category}</td>
                <td>${course.price}</td>
                <td>${course.description}</td>
                <td>${course.capacity}</td>
                <td><button class="btn btn-warning" onclick="updateCourse(${index})">تعديل</button></td>
                <td><button class="btn btn-danger" onclick="deleteCourse(${index})">حذف</button></td>
            </tr>
        `;
        dataTable.innerHTML += row;
    });
}

// دالة لتحديث الكورس
function updateCourse(index) {
    const course = courses[index];
    courseName.value = course.name;
    courseCategory.value = course.category;
    coursePrice.value = course.price;
    courseDescription.value = course.description;
    courseCapacity.value = course.capacity;

    currentIndex = index; // تحديث المؤشر
    addCourseBtn.value = 'Update Course'; // تغيير نص الزر
}

// دالة لحذف كورس
function deleteCourse(index) {
    courses.splice(index, 1);
    displayCourses();
    Swal.fire({
        icon: 'success',
        title: 'تم الحذف',
        text: 'تم حذف الكورس بنجاح!'
    });
}

// دالة لحذف جميع الكورسات
function deleteAllCourses() {
    Swal.fire({
        title: 'هل أنت متأكد؟',
        text: 'سيتم حذف جميع الكورسات!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم، احذف!',
        cancelButtonText: 'إلغاء'
    }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            displayCourses();
            Swal.fire('تم الحذف!', 'تم حذف جميع الكورسات بنجاح!', 'success');
        }
    });
}

// دالة البحث
function searchCourses() {
    const filter = searchInput.value.toLowerCase();
    dataTable.innerHTML = '';
    courses
        .filter((course) =>
            course.name.toLowerCase().includes(filter) ||
            course.category.toLowerCase().includes(filter) ||
            course.description.toLowerCase().includes(filter)
        )
        .forEach((course, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${course.name}</td>
                    <td>${course.category}</td>
                    <td>${course.price}</td>
                    <td>${course.description}</td>
                    <td>${course.capacity}</td>
                    <td><button class="btn btn-warning" onclick="updateCourse(${index})">تعديل</button></td>
                    <td><button class="btn btn-danger" onclick="deleteCourse(${index})">حذف</button></td>
                </tr>
            `;
            dataTable.innerHTML += row;
        });
}

// إضافة الأحداث
addCourseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addCourse();
});
deleteAllBtn.addEventListener('click', deleteAllCourses);
searchInput.addEventListener('input', searchCourses);
