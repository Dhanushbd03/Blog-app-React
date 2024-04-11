import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, control, label, defaultValue = "" }) => {
	return (
		<div className="w-full pb-5">
			{label && <label className="text-xl">{label}</label>}
			<Controller
				name={name || "content"}
				control={control}
				render={({ field: { onChange } }) => {
					return (
						<Editor
							apiKey="5yeuxhvwekmncicvd69d00q7l7sr8xdypcnwr7ts1v1knvlb"
							initialValue={defaultValue}
							init={{
								initialValue: defaultValue,
								height: 500,
								menubar: true,
								plugins: [
									"advlist",
									"autolink",
									"lists",
									"link",
									"image",
									"charmap",
									"print",
									"preview",
									"anchor",
									"searchreplace",
									"visualblocks",
									"code",
									"fullscreen",
									"insertdatetime",
									"media",
									"table",
									"paste",
									"code",
									"wordcount",
									"help",
								],
								toolbar:
									"undo redo | formatselect | bold italic forecolor backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help",
								content_style:
									"body{font-family:Helvetica,Arial,sans-serif;font-size:14px}",
							}}
							onEditorChange={ onChange }
						/>
					);
				}}
			/>
		</div>
	);
};

export default RTE;
