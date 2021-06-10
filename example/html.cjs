// can't be `html.ts` as it is invoked by `theo` as a custom format

const camelCase = require('lodash/camelCase');
const groupBy = require('lodash/groupBy');
const upperFirst = require('lodash/upperFirst');

class Styleguide {
  constructor({ props }) {
    this.categories = groupBy(props, 'category');
  }

  renderRowHeader(id, heading) {
    return `
      <thead>
        <tr id=${id}>
          <th>${heading}</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
    `;
  }

  renderRow(prop, example) {
    return `
      <tr>
        <th>
          <code>${prop.name}</code>
        </th>
        <td>
          <code>${prop.value}</code>
        </td>
        ${example}
      </tr>
    `;
  }

  renderBorderRadius(props) {
    return props.map((prop) => {
      const example = `
        <td>
          <div class="radius-box" style="border-radius: ${prop.value};"></div>
        </td>
      `;
      return this.renderRow(prop, example);
    });
  }

  renderColor(props) {
    return props.map((prop) => {
      const example = `<td style="background-color: ${prop.value}; border: 1px solid #e9ecf0;"></td>`;
      return this.renderRow(prop, example);
    });
  }

  renderSection(type, heading) {
    const props = this.categories[type];
    if (!props) return '';

    const name = upperFirst(camelCase(type));
    const render = this[`render${name}`];

    return `
      <section>
        <table>
          ${this.renderRowHeader(type, heading)}
          <tbody>
            ${render.call(this, props).join('').trim()}
          </tbody>
        </table>
      </section>
    `;
  }

  render() {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Castor Tokens: Example</title>
          <style>
            body {
              color: rgb(43, 45, 51);
              font-family: 'Helvetica Neue', Tahoma, sans-serif;
              font-size: 16px;
              margin: 0;
            }

            code {
              font-family: "Roboto Mono", Consolas, Menlo, monospace;
            }

            .container {
              margin: 0 auto;
              max-width: 1280px;
              padding: 20px 24px;
            }

            table {
              border-collapse: separate;
              border-spacing: 16px;
              table-layout: fixed;
              width: 100%;
            }

            th,
            td {
              hyphens: auto;
              padding: 0 16px;
              vertical-align: baseline;
              word-break: break-word;
            }

            th {
              font-weight: normal;
              text-align: left;
            }

            thead th {
              border-bottom: 1px solid rgb(180, 186, 197);
              color: rgb(99, 102, 112);
              padding-bottom: 8px;
              padding-top: 16px;
            }

            thead th:first-child {
              font-size: 1.25rem;
            }

            .radius-box {
              background-color: rgb(233, 236, 240);
              display: inline-block;
              height: 40px;
              vertical-align: middle;
              width: 100%;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Tokens</h2>
          </div>
          <main class="container">
            ${this.renderSection('border-radius', 'Border Radius')}
            ${this.renderSection('color', 'Color')}
          </main>
        </body>
      </html>
    `;
  }
}

module.exports = (result) => {
  const styleguide = new Styleguide(result.toJS());
  return styleguide.render();
};
