    // เมื่อเอกสาร HTML โหลดเสร็จสิ้น
    document.addEventListener("DOMContentLoaded", function () {
    
    // รับอ้างอิงของ HTML elements
    const todoList = document.getElementById("todo-list"); // ตารางรายการ Todo
    const todoInput = document.getElementById("todo-input"); // input สำหรับใส่รายการ Todo
    const addButton = document.getElementById("add-button"); // ปุ่ม "เพิ่ม"

    // อาร์เรย์สำหรับเก็บรายการ Todo
    let todos = [];

    // เพิ่มรายการ Todo
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            // สร้างอ็อบเจ็กต์รายการ Todo ในรูปแบบ {text: "รายการ", completed: false}
            const todoItem = {
                text: todoText,
                completed: false,
            };
            // เพิ่มอ็อบเจ็กต์รายการ Todo ลงในอาร์เรย์
            todos.push(todoItem);
            // รีเรนเดอร์รายการ Todo ใหม่
            renderTodoList();
            // ล้างค่าใน input
            todoInput.value = "";
        }
    }

    // ลบรายการ Todo
    function deleteTodo(index) {
        // ใช้เมธอด splice เพื่อลบอ็อบเจ็กต์ที่ต้องการจากอาร์เรย์
        todos.splice(index, 1);
        // รีเรนเดอร์รายการ Todo ใหม่
        renderTodoList();
    }

    // ตรวจสอบ/ยกเลิกการเสร็จสิ้นรายการ Todo
    function toggleComplete(index) {
        // สลับค่าคุณสมบัติ completed ของรายการ Todo ที่ถูกกด
        todos[index].completed = !todos[index].completed;
        // รีเรนเดอร์รายการ Todo ใหม่
        renderTodoList();
    } 

    // แสดงรายการ Todo บนหน้าเว็บ
    function renderTodoList() {
        // ล้าง HTML ของตารางรายการ Todo
        todoList.innerHTML = "";
        // วนลูปผ่านทุกรายการในอาร์เรย์
        for (let i = 0; i < todos.length; i++) {
            const todoItem = todos[i];
            // สร้าง <li> element สำหรับแต่ละรายการ Todo
            const listItem = document.createElement("li");
            // กำหนดข้อความของ <li> เป็นข้อความของรายการ Todo
            listItem.textContent = todoItem.text;
            // ถ้ารายการ Todo เสร็จสิ้นแล้ว ให้เพิ่ม class "completed" เพื่อแสดงสีต่าง
            if (todoItem.completed) {
                listItem.classList.add("completed");
            }
            // สร้างปุ่ม "ลบ" สำหรับลบรายการ Todo
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "ลบ";
            deleteButton.addEventListener("click", () => deleteTodo(i));
            
            // สร้างปุ่ม "เสร็จ" หรือ "ยกเลิก" สำหรับตรวจสอบ/ยกเลิกการเสร็จสิ้น
            const completeButton = document.createElement("button");
            completeButton.textContent = todoItem.completed ? "ยกเลิก" : "เสร็จ";
            completeButton.addEventListener("click", () => toggleComplete(i));

            // เพิ่มปุ่ม "เสร็จ" หรือ "ยกเลิก" และปุ่ม "ลบ" เข้ากับ <li>
            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);
            // เพิ่ม <li> ลงในตารางรายการ Todo
            todoList.appendChild(listItem);
        }
    }

    // การกดปุ่ม "เพิ่ม"
    addButton.addEventListener("click", addTodo);

    // การกด Enter ใน input
    todoInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    // แสดงรายการ Todo ครั้งแรกที่โหลดหน้าเว็บ
    renderTodoList();
});
