
# Lambda Layer for common dependencies
resource "aws_lambda_layer_version" "dependencies_lambda_layer" {
  layer_name          = "${var.project_name}_common_dependencies-${var.environment}"
  description         = "Common dependencies for Lambda functions"
  compatible_runtimes = ["python3.13"]

  filename         = data.archive_file.dependencies_lambda_layer_zip.output_path
  source_code_hash = data.archive_file.dependencies_lambda_layer_zip.output_base64sha256

  depends_on = [null_resource.install_common_dependencies]
}

# Install dependencies for the layer
resource "null_resource" "install_common_dependencies" {
  triggers = {
    pyproject_md5 = filemd5("${path.module}/../backend/lambdas/pyproject.toml")
  }

  provisioner "local-exec" {
    command = <<EOT
      mkdir -p ${path.module}/files/dependencies_lambda_layer/python
      cd ${path.module}/../backend/lambdas && uv pip install . --python 3.13 --system --target ../../terraform/files/dependencies_lambda_layer/python
    EOT
  }
}

# Create a zip file of the Lambda layer
data "archive_file" "dependencies_lambda_layer_zip" {
  type        = "zip"
  source_dir  = "${path.module}/files/dependencies_lambda_layer"
  output_path = "${path.module}/files/dependencies_lambda_layer.zip"
  depends_on  = [null_resource.install_common_dependencies]
}

# Lambda Layer for models
resource "aws_lambda_layer_version" "shared_lambda_layer" {
  layer_name          = "${var.project_name}_shared-${var.environment}"
  description         = "Shared code for Lambda functions"
  compatible_runtimes = ["python3.13"]

  filename         = data.archive_file.shared_lambda_layer_zip.output_path
  source_code_hash = data.archive_file.shared_lambda_layer_zip.output_base64sha256
  depends_on       = [null_resource.shared_lambda_layer]
}

resource "null_resource" "shared_lambda_layer" {
  triggers = {
    models_dir_hash  = filemd5("${path.module}/../backend/layers/shared/python/__init__.py")
    data_models_hash = filemd5("${path.module}/../backend/layers/shared/python/models.py")
  }

  provisioner "local-exec" {
    command = <<EOT
      echo "noop"
    EOT
  }
}

# Create a zip file of the Shared Lambda layer
data "archive_file" "shared_lambda_layer_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../backend/layers/shared/"
  output_path = "${path.module}/files/shared_lambda_layer.zip"
  depends_on  = [null_resource.shared_lambda_layer]
  excludes    = [".venv", ".ruff_cache", "__pycache__", "build", "tests", "pyproject.toml", "uv.lock", "python/__pycache__", "python/tucoachai_shared_layer.egg-info"]
}
