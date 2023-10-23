import React, { Component } from "react";
import './assets/trans.css'
import Modal from 'react-modal';

class Wallet extends Component {

    constructor() {
        super();
        this.state = {
            text: [
                { id: 1, name: 'John', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '1' },
                { id: 2, name: 'Alice', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '3' },
                { id: 3, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '2' },
                { id: 4, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '1' },
                { id: 5, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '4' },
                { id: 6, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '6' },
                { id: 7, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '5' },
                { id: 8, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '5' },
                { id: 9, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '5' },
                { id: 10, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '5' },
                { id: 11, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '5' },
                { id: 12, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '5' },
                { id: 13, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '5' },
                { id: 14, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '5' },
                { id: 15, name: 'Bob', content: 'Doan Ngoc Khanh', createAt: '19-10-2023', updateAt: '23-10-2023', textAreaID: '5' },
            ],
            isModalOpen: false,
            selectedText: null,
            isEditing: false, // Trạng thái xem hoặc sửa
            isDelete: false,
            isAdding: false,
        };

        // Bật sử dụng cài đặt mặc định của `react-modal`
        Modal.setAppElement('body');
    }


    handleAddNewText = () => {
        this.setState({ isModalOpen: true, selectedText: null, isAdding: true });
    }

    handleConfirmAddNewText = (text) => {
        const newID = text.length + 1;
        const name = document.getElementById('textName').value;
        const content = document.getElementById('textContent').value;
        const createAt = document.getElementById('textCreateAt').value;
        const updateAt = document.getElementById('textUpdateAt').value;
        const textAreaID = document.getElementById('textTextAreaID').value;

        const newText = {
            id: newID,
            name: name,
            content: content,
            createAt: createAt,
            updateAt: updateAt,
            textAreaID: textAreaID
        };

        const updatedText = {...text, newText};
        this.setState({ isAdding: false, isModalOpen: false, selectedText: null, text: updatedText });
    }



    // xem 
    handleViewClick = (text) => {
        this.setState({ isModalOpen: true, selectedText: text, isEditing: false });
    }

    // sửa
    handleEditClick = (text) => {
        this.setState({ isModalOpen: true, selectedText: text, isEditing: true });
    }

    handleSaveChanges = () => {
        const { text, selectedText } = this.state;
        const updatedText = text.map(item => {
            if (item.id === selectedText.id) {
                // Nếu là sinh viên cần chỉnh sửa, thay đổi các trường dữ liệu
                return selectedText;
            }
            return item;
        });

        this.setState({ isModalOpen: false, selectedText: null, text: updatedText });
    }

    // xóa 
    handleRemoveClick = (text) => {
        this.setState({ isRemove: true, selectedText: text, });
    }

    handleConfirmDelete = () => {
        // Thực hiện xóa sinh viên khỏi danh sách ở đây (cần cập nhật trạng thái state)
        const { text, selectedText } = this.state;
        const updatedText = text.filter(item => item.id !== selectedText.id);
        this.setState({ isRemove: false, text: updatedText, selectedText: null });
    }



    handleCloseRemove = () => {
        this.setState({ isRemove: false, selectedText: null, });
    }


    handleCloseModal = () => {
        this.setState({ isModalOpen: false, selectedText: null });
    }

    render() {

        const { text, isModalOpen, selectedText, isEditing, isRemove, isAdding } = this.state;

        return (
            <div>
                <div class="list-container">
                    <div class="add-new-text">
                        <button class="btn-control btn-add-new" onClick={this.handleAddNewText}>Add Text</button>
                    </div>

                    <div class="table-trans">
                        <table class="content-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>TextName</th>
                                    <th>Content</th>
                                    <th>CreateAt</th>
                                    <th>UpdateAt</th>
                                    <th>TextAreaID</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.text.map(text => (
                                    <tr key={text.id}>
                                        <td>{text.id}</td>
                                        <td>{text.name}</td>
                                        <td>{text.content}</td>
                                        <td>{text.createAt}</td>
                                        <td>{text.updateAt}</td>
                                        <td>{text.textAreaID}</td>
                                        <td>
                                            <button class="btn-control view" onClick={() => this.handleViewClick(text)}>Xem</button>
                                            <button class="btn-control edit" onClick={() => this.handleEditClick(text)}>Sửa</button>
                                            <button class="btn-control remove" onClick={() => this.handleRemoveClick(text)}>Xóa</button>

                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>


                <Modal
                    isOpen={isModalOpen && isAdding}
                    onRequestClose={this.handleCloseModal}
                    contentLabel="Add Text Modal"
                >
                    {
                        <div className="main">
                            <div className="popup">
                                <div className="popup-title">
                                    <h3>Add Text</h3>
                                </div>
                                <div className="popup-content">
                                    <table>
                                        
                                        <tr class="popup-row">
                                            <td><label for="textName" class="input-lbl">Name:</label></td>
                                            <td><input type="text" id="textName"></input></td>
                                        </tr>
                                        <tr class="popup-row">
                                            <td><label for="textContent" class="input-lbl">Content:</label></td>
                                            <td><input type="text" id="textContent"></input></td>
                                        </tr>
                                        <tr class="popup-row">
                                            <td><label for="textCreateAt" class="input-lbl">CreateAt:</label></td>
                                            <td><input type="text" id="textCreateAt"></input></td>
                                        </tr>
                                        <tr class="popup-row">
                                            <td><label for="textUpdateAt" class="input-lbl">UpdateAt:</label></td>
                                            <td><input type="text" id="textUpdateAt"></input></td>
                                        </tr>
                                        <tr class="popup-row">
                                            <td><label for="textTextAreaID" class="input-lbl">TextAreaID:</label></td>
                                            <td>
                                                <td><input type="text" id="textTextAreaID"></input></td>

                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="popup-footer">
                                    <div className="popup-buttons">
                                        <button className="btn btn-ok" onClick={this.handleConfirmAddNewText}>Lưu</button>
                                        <button className="btn btn-cancel" onClick={this.handleCloseModal}>Hủy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Modal>


                <Modal
                    isOpen={isModalOpen && !isAdding}
                    onRequestClose={this.handleCloseModal}
                    contentLabel="Text Edit Modal"
                >
                    {selectedText && (
                        <div class="main">
                            <div class="popup">
                                <div class="popup-title">
                                    <h3>{isEditing ? "Sửa thông tin đoạn Text" : "Xem thông tin đoạn Text"}</h3>
                                </div>
                                <div class="popup-content">
                                    <table>
                                        <tr class="popup-row">
                                            <td><label for="textId" class="input-lbl">ID:</label></td>
                                            <td><span>{selectedText.id}</span></td>
                                        </tr>
                                        <tr class="popup-row">
                                            <td><label for="textName" class="input-lbl">Name:</label></td>
                                            <td>
                                                {isEditing ? (
                                                    <input type="text" value={selectedText.name} onChange={e => {
                                                        const updatedText = { ...selectedText, name: e.target.value };
                                                        this.setState({ selectedText: updatedText });
                                                    }}
                                                    />
                                                ) : (
                                                    <span>{selectedText.name}</span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr class="popup-row">
                                            <td><label for="textName" class="input-lbl">Content:</label></td>
                                            <td>
                                                {isEditing ? (
                                                    <input type="text" value={selectedText.content} onChange={e => {
                                                        const updatedText = { ...selectedText, content: e.target.value };
                                                        this.setState({ selectedText: updatedText });
                                                    }}
                                                    />
                                                ) : (
                                                    <span>{selectedText.content}</span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr class="popup-row">
                                            <td><label for="textDate" class="input-lbl">CreateAt:</label></td>
                                            <td>
                                                {isEditing ? (
                                                    <input type="text" value={selectedText.createAt} onChange={e => {
                                                        const updatedText = { ...selectedText, createAt: e.target.value };
                                                        this.setState({ selectedText: updatedText });
                                                    }}
                                                    />
                                                ) : (
                                                    <span>{selectedText.createAt}</span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr class="popup-row">
                                            <td><label for="textDate" class="input-lbl">UpdateAt:</label></td>
                                            <td>
                                                {isEditing ? (
                                                    <input type="text" value={selectedText.updateAt} onChange={e => {
                                                        const updatedText = { ...selectedText, updateAt: e.target.value };
                                                        this.setState({ selectedText: updatedText });
                                                    }}
                                                    />
                                                ) : (
                                                    <span>{selectedText.updateAt}</span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr class="popup-row">
                                            <td><label for="textDescription" class="input-lbl">TextAreaID:</label></td>
                                            <td>
                                                {isEditing ? (
                                                    <input type="text" value={selectedText.textAreaID} onChange={e => {
                                                        const updatedText = { ...selectedText, textAreaID: e.target.value };
                                                        this.setState({ selectedText: updatedText });
                                                    }}
                                                    />
                                                ) : (
                                                    <span>{selectedText.textAreaID}</span>
                                                )}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="popup-footer">
                                    <div class="popup-buttons">
                                        <button id="okButton" class="btn btn-ok" onClick={this.handleSaveChanges}>Lưu</button>
                                        <button id="okButton" class="btn btn-cancel" onClick={this.handleCloseModal}>Đóng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>




                <Modal
                    isOpen={isRemove}
                    onRequestClose={this.handleCloseRemove}
                    contentLabel="Delete Confirmation Modal"
                >
                    {selectedText && (
                        <div class="main">
                            <div id="deletePopup" class="popup">
                                <div class="popup-child popup-title">
                                    <h3>Xác nhận xóa?</h3>
                                </div>
                                <div class="popup-child popup-content">
                                    <div class="popup-row">
                                        <p>Bạn có chắc muốn xóa dữ liệu này không?</p>
                                    </div>
                                </div>
                                <div class="popup-child popup-footer">
                                    <div class="popup-child popup-buttons">
                                        <button onClick={this.handleConfirmDelete}>Xác nhận</button>
                                        <button onClick={this.handleCloseRemove}>Hủy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

            </div>
        );
    }
}

export default Wallet;