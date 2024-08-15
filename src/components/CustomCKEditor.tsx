import React from 'react';
import { useField } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Bold,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    Table,
    Undo
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
interface CustomCKEditorProps {
    name: string;
    label: string;
}

const CustomCKEditor: React.FC<CustomCKEditorProps> = ({ name, label }) => {
    const [field, , { setValue, setTouched }] = useField<string>(name);

    const handleEditorChange = (_ : any, editor: ClassicEditor) => {
        const data = editor.getData();
        console.log("data" + data)
        setValue(data); // Update Formik state
    };

    return (
        <div>
            <label>{label}</label>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    toolbar: [
                        'undo', 'redo', '|',
                        'heading', '|', 'bold', 'italic', '|',
                        'link', 'insertTable', 'mediaEmbed', '|',
                        'bulletedList', 'numberedList', 'indent', 'outdent'
                    ],
                    plugins: [
                        Bold,
                        Essentials,
                        Heading,
                        Indent,
                        IndentBlock,
                        Italic,
                        Link,
                        List,
                        MediaEmbed,
                        Paragraph,
                        Table,
                        Undo
                    ],
        
                }}
                data={field.value}
                onChange={(_, editor) => handleEditorChange(_,editor)}
                onBlur={() => setTouched(true)} // Mark the field as touched on blur
            />
         
        </div>
    );
};
export default CustomCKEditor;
