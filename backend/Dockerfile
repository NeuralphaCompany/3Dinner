FROM python:3.9 as python
ENV PYTHONUNBUFFERED=true


FROM python as poetry
ENV POETRY_HOME=/opt/poetry
ENV POETRY_VIRTUALENVS_IN_PROJECT=true
ENV POETRY_VIRTUALENVS_CREATE=false
ENV PATH="$POETRY_HOME/bin:$PATH"
RUN python -c 'from urllib.request import urlopen; print(urlopen("https://install.python-poetry.org").read().decode())' | python -
COPY . ./
RUN pip install -r requirements.txt
RUN poetry install --no-dev
#--no-interaction --no-ansi -vvv
# FROM python as runtime
# ENV PATH="/app/.venv/bin:$PATH"
# ENV POETRY_HOME=/opt/poetry
# ENV PATH="$POETRY_HOME/bin:$PATH"
# COPY --from=poetry /app /app
# EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]

